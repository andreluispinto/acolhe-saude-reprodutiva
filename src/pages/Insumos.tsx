import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { 
  Pill, 
  FlaskConical, 
  Stethoscope, 
  AlertCircle, 
  CheckCircle, 
  ShoppingCart,
  Sparkles,
  Clock,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const protocols = [
  {
    id: 1,
    name: "Protocolo Pré-Concepcional",
    status: "active",
    progress: 60,
    items: [
      { name: "Ácido Fólico 5mg", dosage: "1x ao dia", stock: 15, status: "ok" },
      { name: "Vitamina D3 2000UI", dosage: "1x ao dia", stock: 3, status: "low" },
      { name: "Ferro Quelato 30mg", dosage: "1x ao dia", stock: 20, status: "ok" },
    ],
  },
];

const recommendations = [
  {
    id: 1,
    type: "supplement",
    name: "Ômega-3 DHA",
    reason: "Baseado no seu perfil, pode auxiliar no desenvolvimento fetal",
    confidence: 92,
    icon: Pill,
    color: "coral",
  },
  {
    id: 2,
    type: "exam",
    name: "Dosagem de Vitamina B12",
    reason: "Importante verificar antes da gestação",
    confidence: 88,
    icon: FlaskConical,
    color: "teal",
  },
  {
    id: 3,
    type: "consultation",
    name: "Consulta Endocrinológica",
    reason: "Para avaliação da função tireoidiana",
    confidence: 75,
    icon: Stethoscope,
    color: "lavender",
  },
];

const pharmacies = [
  { name: "Farmácia Vida", price: 45.9, delivery: "Entrega em 2h", discount: 10 },
  { name: "DrogaRede", price: 49.9, delivery: "Entrega em 4h", discount: 5 },
  { name: "Farmácia Popular", price: 38.9, delivery: "Retirar na loja", discount: 0 },
];

const colorClasses = {
  coral: "bg-coral-light text-primary",
  teal: "bg-teal-light text-teal",
  lavender: "bg-lavender-light text-lavender",
};

export default function Insumos() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);

  return (
    <Layout>
      <section className="py-8 lg:py-12 bg-soft-pink min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Recomendações por IA</span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              Smart Insumos
            </h1>
            <p className="text-muted-foreground">
              Protocolos personalizados e recomendações inteligentes para sua jornada.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Protocol */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              {protocols.map((protocol) => (
                <div key={protocol.id} className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 text-xs font-medium bg-teal-light text-teal rounded-full">
                          Ativo
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        {protocol.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-foreground">{protocol.progress}%</p>
                      <p className="text-sm text-muted-foreground">Progresso</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${protocol.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full gradient-hero rounded-full"
                    />
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {protocol.items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.status === "ok" ? "bg-teal-light text-teal" : "bg-coral-light text-primary"
                          }`}>
                            <Pill className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.dosage}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {item.status === "low" ? (
                                <AlertCircle className="w-4 h-4 text-primary" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-teal" />
                              )}
                              <span className={`text-sm font-medium ${
                                item.status === "low" ? "text-primary" : "text-teal"
                              }`}>
                                {item.stock} unidades
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Em estoque</p>
                          </div>

                          {item.status === "low" && (
                            <Button variant="soft" size="sm">
                              <ShoppingCart className="w-4 h-4" />
                              Repor
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

              {/* AI Recommendations */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Recomendações da IA
                  </h3>
                </div>

                <div className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const colors = colorClasses[rec.color as keyof typeof colorClasses];
                    const isSelected = selectedRecommendation === rec.id;

                    return (
                      <motion.button
                        key={rec.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => setSelectedRecommendation(isSelected ? null : rec.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          isSelected ? "bg-coral-light border border-primary/20" : "bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl ${colors} flex items-center justify-center flex-shrink-0`}>
                              <rec.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground mb-1">{rec.name}</p>
                              <p className="text-sm text-muted-foreground">{rec.reason}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm font-medium text-primary">{rec.confidence}%</span>
                            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isSelected ? "rotate-90" : ""}`} />
                          </div>
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pt-4 border-t border-border"
                          >
                            <Button variant="hero" size="sm">
                              Adicionar ao Protocolo
                            </Button>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Next Dose */}
              <div className="bg-gradient-to-br from-coral-light to-lavender-light rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Próxima Dose</h3>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <p className="text-lg font-semibold text-foreground">Ácido Fólico 5mg</p>
                  <p className="text-sm text-muted-foreground">Hoje às 08:00</p>
                </div>
                <Button variant="teal" className="w-full">
                  <CheckCircle className="w-4 h-4" />
                  Marcar como Tomado
                </Button>
              </div>

              {/* Pharmacy Integration */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Farmácias Parceiras
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare preços para Vitamina D3 2000UI
                </p>

                <div className="space-y-3">
                  {pharmacies.map((pharmacy, index) => (
                    <motion.div
                      key={pharmacy.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-3 bg-muted/50 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground">{pharmacy.name}</p>
                        <div className="flex items-center gap-1">
                          {pharmacy.discount > 0 && (
                            <span className="text-xs bg-teal-light text-teal px-2 py-0.5 rounded-full">
                              -{pharmacy.discount}%
                            </span>
                          )}
                          <span className="font-semibold text-foreground">
                            R$ {pharmacy.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{pharmacy.delivery}</p>
                    </motion.div>
                  ))}
                </div>

                <Button variant="soft" className="w-full mt-4">
                  <ExternalLink className="w-4 h-4" />
                  Ver Todas as Ofertas
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
