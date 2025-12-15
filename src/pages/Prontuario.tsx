import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { 
  FileText, 
  Calendar, 
  Pill, 
  Activity, 
  Heart, 
  Baby, 
  TestTube, 
  ChevronRight,
  Download,
  Share2,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const patientInfo = {
  name: "Maria Silva",
  age: 32,
  bloodType: "O+",
  lastVisit: new Date(2024, 11, 10),
};

const timeline = [
  {
    id: 1,
    date: new Date(2024, 11, 10),
    type: "consultation",
    title: "Consulta Ginecológica",
    professional: "Dra. Ana Beatriz",
    description: "Avaliação inicial para planejamento de gestação. Solicitados exames laboratoriais.",
    icon: Heart,
    color: "coral",
  },
  {
    id: 2,
    date: new Date(2024, 11, 5),
    type: "exam",
    title: "Ultrassom Pélvico",
    professional: "Dr. Roberto Campos",
    description: "Sem alterações significativas. Útero e ovários com aspecto normal.",
    icon: Activity,
    color: "teal",
  },
  {
    id: 3,
    date: new Date(2024, 10, 28),
    type: "lab",
    title: "Exames Laboratoriais",
    professional: "Laboratório Vida",
    description: "FSH, LH, Estradiol, TSH, Prolactina - todos dentro dos valores de referência.",
    icon: TestTube,
    color: "lavender",
  },
  {
    id: 4,
    date: new Date(2024, 10, 20),
    type: "prescription",
    title: "Prescrição de Suplementos",
    professional: "Dra. Fernanda Lima",
    description: "Ácido fólico 5mg e Vitamina D3 - início do protocolo pré-concepcional.",
    icon: Pill,
    color: "coral",
  },
  {
    id: 5,
    date: new Date(2024, 10, 15),
    type: "consultation",
    title: "Consulta Nutricional",
    professional: "Dra. Fernanda Lima",
    description: "Orientações alimentares para otimização da fertilidade. Plano nutricional elaborado.",
    icon: Heart,
    color: "teal",
  },
];

const metrics = [
  { label: "Consultas", value: "8", icon: Calendar },
  { label: "Exames", value: "12", icon: TestTube },
  { label: "Prescrições", value: "4", icon: Pill },
];

const colorClasses = {
  coral: "bg-coral-light text-primary border-primary/20",
  teal: "bg-teal-light text-teal border-teal/20",
  lavender: "bg-lavender-light text-lavender border-lavender/20",
};

export default function Prontuario() {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);

  return (
    <Layout>
      <section className="py-8 lg:py-12 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                  Prontuário Digital
                </h1>
                <p className="text-muted-foreground">
                  Histórico clínico completo da sua jornada reprodutiva.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Patient Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Profile Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center">
                    <span className="text-xl font-semibold text-primary-foreground">MS</span>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {patientInfo.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {patientInfo.age} anos • {patientInfo.bloodType}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="text-center p-3 bg-muted rounded-xl">
                      <metric.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xl font-semibold text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fertility Window Card */}
              <div className="bg-gradient-to-br from-coral-light to-lavender-light rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Baby className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Janela Fértil</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Próximo período fértil estimado
                </p>
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-lg font-semibold text-foreground">18-23 Dezembro</p>
                  <p className="text-sm text-muted-foreground">Baseado no seu ciclo médio de 28 dias</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-display font-semibold text-foreground mb-4">Ações Rápidas</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <Plus className="w-5 h-5 text-primary" />
                      <span className="font-medium">Adicionar Exame</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-teal" />
                      <span className="font-medium">Registrar Ciclo</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Linha do Tempo
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Todos
                    </Button>
                    <Button variant="ghost" size="sm">
                      Consultas
                    </Button>
                    <Button variant="ghost" size="sm">
                      Exames
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-border" />

                  <div className="space-y-6">
                    {timeline.map((entry, index) => {
                      const colors = colorClasses[entry.color as keyof typeof colorClasses];
                      const isSelected = selectedEntry === entry.id;

                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="relative flex gap-4"
                        >
                          {/* Icon */}
                          <div
                            className={`relative z-10 w-12 h-12 rounded-xl ${colors} border flex items-center justify-center flex-shrink-0`}
                          >
                            <entry.icon className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <button
                            onClick={() => setSelectedEntry(isSelected ? null : entry.id)}
                            className={`flex-1 text-left p-4 rounded-xl transition-all ${
                              isSelected
                                ? "bg-coral-light border border-primary/20"
                                : "bg-muted/50 hover:bg-muted"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">
                                {entry.title}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {format(entry.date, "dd MMM", { locale: ptBR })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {entry.professional}
                            </p>
                            <p className="text-sm text-foreground/80">
                              {entry.description}
                            </p>

                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-4 pt-4 border-t border-border"
                              >
                                <div className="flex gap-2">
                                  <Button variant="soft" size="sm">
                                    <FileText className="w-4 h-4" />
                                    Ver Detalhes
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4" />
                                    Baixar PDF
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
