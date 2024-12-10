"use client";

export const SiteFooter = () => {
  const date = new Date();
  return (
    <footer className="container w-full py-16">
      <div className="rounded-2xl border-secondary bg-card p-10 text-center shadow-md dark:border">
        <h3>
          جميع الحقوق محفوظة &copy; {date.getFullYear()}
          <span className="font-semibold text-primary"> وجبــاتي</span>
        </h3>
      </div>
    </footer>
  );
};
