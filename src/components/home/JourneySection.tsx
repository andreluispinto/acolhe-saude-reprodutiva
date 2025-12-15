import { motion } from "framer-motion";
import { Bot, UserCheck, Calendar, FileHeart, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Bot,
    title: "Triagem Inicial",
    description: "Nosso chatbot clínico com IA entende suas necessidades e direciona você.",
  },
  {
    icon: UserCheck,
    title: "Matching Inteligente",
    description: "Conectamos você ao profissional ideal baseado no seu perfil.",
  },
  {
    icon: Calendar,
    title: "Agendamento Automático",
    description: "Sugestão de horários otimizados considerando sua janela fértil.",
  },
  {
    icon: FileHeart,
    title: "Atendimento Registrado",
    description: "Todas as consultas documentadas no prontuário digital.",
  },
  {
    icon: Sparkles,
    title: "Próximos Passos",
    description: "Smart Insumos recomenda o protocolo ideal para você.",
  },
];

export function JourneySection() {
  return (
    <section className="py-24 bg-soft-pink relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-coral-light opacity-30 blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-light opacity-40 blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Sua jornada{" "}
            <span className="text-gradient">simplificada</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Da triagem inicial ao acompanhamento contínuo, cada etapa integrada 
            por inteligência artificial.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-border hidden md:block" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 mb-8 last:mb-0"
              >
                {/* Icon Container */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-background border-2 border-primary flex items-center justify-center shadow-lg">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border p-6 flex-1 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-primary bg-coral-light px-2 py-1 rounded-full">
                      Passo {index + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
