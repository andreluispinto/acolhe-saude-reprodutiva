import { motion } from "framer-motion";
import { Calendar, FileText, Pill, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Calendar,
    title: "Agenda Online",
    description:
      "Agendamento inteligente com regras clínicas, integração com calendários e confirmação automática.",
    features: ["Janela fértil", "Múltiplos profissionais", "Lembretes automáticos"],
    link: "/agenda",
    color: "coral",
  },
  {
    icon: FileText,
    title: "Prontuário Digital",
    description:
      "Histórico clínico longitudinal completo, com evolução da jornada e compartilhamento seguro.",
    features: ["Timeline visual", "Exames integrados", "LGPD compliant"],
    link: "/prontuario",
    color: "teal",
  },
  {
    icon: Pill,
    title: "Smart Insumos",
    description:
      "Protocolos personalizados com recomendação inteligente de medicamentos e suplementos.",
    features: ["IA recomendadora", "Integração farmácias", "Alertas de estoque"],
    link: "/insumos",
    color: "lavender",
  },
  {
    icon: Users,
    title: "Rede de Acolhimento",
    description:
      "Matching inteligente com profissionais multidisciplinares para suporte completo.",
    features: ["Triagem por IA", "Multidisciplinar", "Chat integrado"],
    link: "/acolhimento",
    color: "coral",
  },
];

const colorClasses = {
  coral: {
    bg: "bg-coral-light",
    icon: "text-primary",
    hover: "group-hover:bg-primary group-hover:text-primary-foreground",
  },
  teal: {
    bg: "bg-teal-light",
    icon: "text-teal",
    hover: "group-hover:bg-teal group-hover:text-primary-foreground",
  },
  lavender: {
    bg: "bg-lavender-light",
    icon: "text-lavender",
    hover: "group-hover:bg-lavender group-hover:text-primary-foreground",
  },
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Cuidado completo para sua{" "}
            <span className="text-gradient">jornada</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Quatro pilares integrados para acompanhar você em cada etapa da 
            reprodução humana.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.link}>
                  <div className="group relative bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.icon} ${colors.hover} flex items-center justify-center mb-6 transition-all duration-300`}
                    >
                      <service.icon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-primary font-medium">
                      <span className="mr-2">Acessar</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
