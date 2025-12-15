import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { 
  Bot, 
  Send, 
  User as UserIcon,
  Heart,
  Calendar,
  Star,
  MessageCircle,
  Phone,
  Video,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const specialists = [
  {
    id: 1,
    name: "Dra. Ana Beatriz",
    specialty: "Ginecologista",
    rating: 4.9,
    reviews: 127,
    available: true,
    avatar: "AB",
    color: "coral",
    tags: ["Fertilidade", "Endometriose"],
  },
  {
    id: 2,
    name: "Dra. Marina Silva",
    specialty: "Psicóloga Perinatal",
    rating: 5.0,
    reviews: 89,
    available: true,
    avatar: "MS",
    color: "lavender",
    tags: ["Ansiedade", "Luto Gestacional"],
  },
  {
    id: 3,
    name: "Dra. Fernanda Lima",
    specialty: "Nutricionista",
    rating: 4.8,
    reviews: 64,
    available: false,
    avatar: "FL",
    color: "teal",
    tags: ["Fertilidade", "Suplementação"],
  },
];

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  options?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    content: "Olá! Sou a assistente virtual da Vida Fértil. Estou aqui para ajudá-la a encontrar o profissional ideal para sua jornada. 💝",
    timestamp: new Date(),
  },
  {
    id: 2,
    type: "bot",
    content: "Como você está se sentindo hoje? Isso me ajudará a direcionar melhor o seu atendimento.",
    timestamp: new Date(),
    options: ["Bem, apenas planejando", "Ansiosa com o processo", "Precisando de apoio emocional", "Com dúvidas médicas"],
  },
];

const colorClasses = {
  coral: "bg-coral-light text-primary",
  teal: "bg-teal-light text-teal",
  lavender: "bg-lavender-light text-lavender",
};

export default function Acolhimento() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        "Bem, apenas planejando": "Que bom saber que você está bem! 🌸 Planejamento é fundamental. Posso sugerir uma consulta com nossa ginecologista especialista em fertilidade, Dra. Ana Beatriz, para avaliar seu perfil e iniciar os cuidados pré-concepcionais.",
        "Ansiosa com o processo": "Entendo como esse momento pode gerar ansiedade. 🤍 É completamente normal. Recomendo conversar com nossa psicóloga perinatal, Dra. Marina Silva, que pode te ajudar a lidar com essas emoções durante a jornada.",
        "Precisando de apoio emocional": "Você está no lugar certo para receber acolhimento. 💕 Nossa Dra. Marina Silva é especialista em suporte emocional durante a jornada reprodutiva. Gostaria que eu verificasse a disponibilidade dela?",
        "Com dúvidas médicas": "Claro, posso ajudar! 🩺 Para dúvidas médicas específicas, recomendo uma consulta com nossa equipe. Você gostaria de agendar com a Dra. Ana Beatriz (Ginecologista) ou prefere primeiro tirar algumas dúvidas comigo?",
      };

      const response = botResponses[content] || "Entendi! Vou analisar suas necessidades e sugerir os melhores profissionais para você. Poderia me contar mais sobre o que está buscando?";

      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

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
            <div className="flex items-center gap-2 text-primary mb-2">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">Acolhimento Humanizado + IA</span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              Rede de Acolhimento
            </h1>
            <p className="text-muted-foreground">
              Conectamos você aos profissionais ideais para cada etapa da sua jornada.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl border border-border shadow-sm h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Assistente Vida Fértil</p>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                      <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Powered by IA
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          message.type === "bot"
                            ? "gradient-hero"
                            : "bg-teal-light"
                        }`}
                      >
                        {message.type === "bot" ? (
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <UserIcon className="w-4 h-4 text-teal" />
                        )}
                      </div>

                      <div className={`max-w-[80%] ${message.type === "user" ? "text-right" : ""}`}>
                        <div
                          className={`p-4 rounded-2xl ${
                            message.type === "bot"
                              ? "bg-muted/50 rounded-tl-none"
                              : "bg-primary text-primary-foreground rounded-tr-none"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>

                        {/* Options */}
                        {message.options && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 text-sm font-medium bg-coral-light text-primary rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="p-4 bg-muted/50 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-100" />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-200" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button
                      variant="hero"
                      size="icon"
                      className="h-12 w-12"
                      onClick={() => handleSendMessage(inputValue)}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Specialists Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-4"
            >
              <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Especialistas Recomendados
                </h3>

                <div className="space-y-3">
                  {specialists.map((specialist, index) => {
                    const colors = colorClasses[specialist.color as keyof typeof colorClasses];
                    return (
                      <motion.div
                        key={specialist.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-xl ${colors} flex items-center justify-center font-semibold`}>
                            {specialist.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-foreground">{specialist.name}</p>
                              {specialist.available && (
                                <span className="w-2 h-2 rounded-full bg-teal" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{specialist.specialty}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 text-primary fill-current" />
                              <span className="text-sm font-medium text-foreground">{specialist.rating}</span>
                              <span className="text-xs text-muted-foreground">({specialist.reviews} avaliações)</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {specialist.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 text-xs bg-background rounded-full text-muted-foreground">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="soft" size="sm" className="flex-1">
                            <Calendar className="w-4 h-4" />
                            Agendar
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <Button variant="ghost" className="w-full mt-4">
                  Ver Todos os Especialistas
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Help Card */}
              <div className="bg-gradient-to-br from-coral-light to-lavender-light rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Precisa de Ajuda?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe está disponível para te acolher a qualquer momento.
                </p>
                <Button variant="hero" className="w-full">
                  Falar com Humano
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
