export function PageStub({ title }: { title: string }) {
  return (
    <div className="shell py-16 md:py-24">
      <h1 className="font-serif text-[clamp(2.75rem,5vw,4.5rem)] leading-none tracking-tight text-ink">
        {title}
      </h1>
    </div>
  );
}
