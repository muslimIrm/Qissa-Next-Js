function ErrorLoading({onClick}) {
    return (
        <div className="text-center !mt-6 !w-full flex flex-col !items-center !justify-center !h-full">
            <p className="text-red-800 !mb-2">فشل في تحميل القصص. تأكد من الاتصال وأعد المحاولة.</p>
            <button
                onClick={onClick}
                className="!px-6 !py-2 bg-[var(--primary-color)] text-white rounded-xl shadow hover:opacity-90 transition"
            >
                إعادة المحاولة
            </button>
        </div>
    );
}

export default ErrorLoading