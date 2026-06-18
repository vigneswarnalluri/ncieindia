"use client";
import { Activity, Clock } from "lucide-react";

export interface AuditLog { id: string; ts: string; code: string; actor: string; ip: string; details: string; }
interface Props { logs: AuditLog[]; }

export default function SecurityTab({ logs }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div>
          <h1 className="text-base font-bold text-zinc-900">System Audit &amp; Security Logs</h1>
          <p className="text-[11px] text-zinc-500 mt-0.5">NIC compliance read-only audit trail. All admin actions are immutably timestamped.</p>
        </div>
        <span className="text-[10px] bg-red-50 text-red-800 border border-red-300 font-mono font-bold px-3 py-1 uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">AUDIT MODE ACTIVE</span>
      </div>

      <div className="bg-white border border-zinc-200">
        <div className="px-4 py-2.5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0D6B4F]" /> System Audit Log — NIC Compliance (IT Act 2000, Sec 43A)
          </span>
          <span className="text-[10px] text-zinc-400 flex items-center gap-1"><Clock className="w-3 h-3"/> Live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#0D6B4F] text-white text-[10px] uppercase tracking-wider">
                {["Timestamp","Activity Code","Authorised Actor","Source IP","Log Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 font-semibold text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {logs.length > 0 ? (
                logs.map((log, i) => (
                  <tr key={log.id} className={`${i%2===0?"bg-white":"bg-zinc-50/50"} font-mono text-[11px] hover:bg-[#e8f5f0]/40`}>
                    <td className="px-4 py-2 text-zinc-500 whitespace-nowrap">{log.ts}</td>
                    <td className="px-4 py-2 font-bold text-zinc-800">{log.code}</td>
                    <td className="px-4 py-2 text-[#0D6B4F]">{log.actor}</td>
                    <td className="px-4 py-2 text-zinc-500">{log.ip}</td>
                    <td className="px-4 py-2 text-zinc-700 font-sans">{log.details}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-400 italic font-sans">
                    No system audit logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-zinc-200 bg-zinc-50 text-[10px] text-zinc-500">
          Showing {logs.length} records &nbsp;|&nbsp; Logs retained for 7 years per NIC data retention policy.
        </div>
      </div>
    </div>
  );
}
