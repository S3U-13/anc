import { XCircle } from "@deemlol/next-icons";

export default function Unauthorized() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        {/* Icon + Title */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
            {/* simple lock icon (inline svg) */}
            <XCircle size={40} className="text-red-600" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Access Denied
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              คุณไม่มีสิทธิ์เข้าใช้งานหน้านี้ — โปรดตรวจสอบสิทธิ์
              หรือเข้าสู่ระบบใหม่
            </p>
          </div>
        </div>

        {/* body */}
        <div className="mt-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            หากคุณคิดว่าควรจะเข้าถึงหน้านี้ได้
            โปรดติดต่อผู้ดูแลระบบหรือเข้าสู่ระบบด้วยบัญชีที่มีสิทธิ์
          </p>

          {/* actions */}

          <p className="mt-4 text-xs text-gray-400">
            ต้องการความช่วยเหลือ? ติดต่อ{" "}
            <a
              className="text-blue-600 underline"
            >
              ศูนย์คอมพิวเตอร์
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
