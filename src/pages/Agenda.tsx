import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Calendar as CalendarIcon, Clock, User, Video, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

const professionals = [
  { id: 1, name: "Dra. Ana Beatriz", specialty: "Ginecologista", avatar: "AB", color: "coral" },
  { id: 2, name: "Dr. Carlos Mendes", specialty: "Urologista", avatar: "CM", color: "teal" },
  { id: 3, name: "Dra. Marina Silva", specialty: "Psicóloga", avatar: "MS", color: "lavender" },
  { id: 4, name: "Dra. Fernanda Lima", specialty: "Nutricionista", avatar: "FL", color: "coral" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30"
];

const bookedSlots = [
  { date: addDays(new Date(), 1), time: "09:00", professional: 1 },
  { date: addDays(new Date(), 1), time: "10:30", professional: 1 },
  { date: addDays(new Date(), 2), time: "14:00", professional: 2 },
  { date: addDays(new Date(), 3), time: "11:00", professional: 3 },
];

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const isSlotBooked = (time: string, date: Date, professionalId: number) => {
    return bookedSlots.some(
      (slot) =>
        isSameDay(slot.date, date) &&
        slot.time === time &&
        slot.professional === professionalId
    );
  };

  const filteredProfessionals = selectedProfessional
    ? professionals.filter((p) => p.id === selectedProfessional)
    : professionals;

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
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              Agenda Online
            </h1>
            <p className="text-muted-foreground">
              Escolha seu profissional e horário ideal para sua consulta.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Professionals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">Profissionais</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedProfessional(null)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedProfessional === null
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="font-medium">Todos</span>
                  </button>

                  {professionals.map((pro) => (
                    <button
                      key={pro.id}
                      onClick={() => setSelectedProfessional(pro.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        selectedProfessional === pro.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                            pro.color === "coral"
                              ? "bg-coral-light text-primary"
                              : pro.color === "teal"
                              ? "bg-teal-light text-teal"
                              : "bg-lavender-light text-lavender"
                          } ${selectedProfessional === pro.id ? "bg-primary-foreground/20 text-primary-foreground" : ""}`}
                        >
                          {pro.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{pro.name}</p>
                          <p className={`text-xs ${selectedProfessional === pro.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {pro.specialty}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Appointment Types */}
              <div className="bg-card rounded-2xl border border-border p-4 shadow-sm mt-4">
                <p className="font-medium text-foreground mb-3">Tipo de Consulta</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-teal-light text-teal hover:bg-teal hover:text-primary-foreground transition-all">
                    <Video className="w-5 h-5" />
                    <span className="font-medium">Teleconsulta</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Presencial</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Main Content - Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setWeekStart(addDays(weekStart, -7))}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <h2 className="font-display text-lg font-semibold text-foreground">
                    {format(weekStart, "MMMM yyyy", { locale: ptBR })}
                  </h2>

                  <button
                    onClick={() => setWeekStart(addDays(weekStart, 7))}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Week Days */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {weekDays.map((day) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, new Date());
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : isToday
                            ? "bg-coral-light text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        <p className={`text-xs uppercase ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {format(day, "EEE", { locale: ptBR })}
                        </p>
                        <p className="text-lg font-semibold mt-1">
                          {format(day, "d")}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots by Professional */}
                <div className="space-y-6">
                  {filteredProfessionals.map((pro) => (
                    <div key={pro.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                            pro.color === "coral"
                              ? "bg-coral-light text-primary"
                              : pro.color === "teal"
                              ? "bg-teal-light text-teal"
                              : "bg-lavender-light text-lavender"
                          }`}
                        >
                          {pro.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{pro.name}</p>
                          <p className="text-sm text-muted-foreground">{pro.specialty}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                        {timeSlots.map((time) => {
                          const isBooked = isSlotBooked(time, selectedDate, pro.id);
                          const isSelected = selectedSlot === `${pro.id}-${time}`;

                          return (
                            <button
                              key={`${pro.id}-${time}`}
                              onClick={() => !isBooked && setSelectedSlot(`${pro.id}-${time}`)}
                              disabled={isBooked}
                              className={`p-2 rounded-lg text-sm font-medium transition-all ${
                                isBooked
                                  ? "bg-muted text-muted-foreground/50 cursor-not-allowed line-through"
                                  : isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted hover:bg-primary/10 hover:text-primary"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Slot Action */}
                {selectedSlot && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 bg-coral-light rounded-xl"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">
                            {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })} às {selectedSlot.split("-")[1]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {professionals.find((p) => p.id === parseInt(selectedSlot.split("-")[0]))?.name}
                          </p>
                        </div>
                      </div>
                      <Button variant="hero">
                        Confirmar Agendamento
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
