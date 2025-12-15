import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="gradient-hero rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
              >
                <Heart className="w-8 h-8 text-primary-foreground fill-current" />
              </motion.div>

              {/* Content */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-foreground mb-4">
                Pronta para começar sua jornada?
              </h2>
              <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-8">
                Nossa equipe de especialistas está pronta para acolher você com 
                carinho e tecnologia de ponta.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/acolhimento">
                  <Button
                    size="xl"
                    className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    Iniciar Triagem
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/agenda">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Ver Agenda
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
