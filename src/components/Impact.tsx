const metrics = [
  { value: "120K+", label: "Speech Samples" },
  { value: "5+", label: "NLP Models" },
  { value: "20+", label: "Universities" },
];

const Impact = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Global <span className="text-primary">Impact</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gradient-gold mb-3">
                {metric.value}
              </div>
              <div className="text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
