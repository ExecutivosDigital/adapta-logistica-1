"use client";
import { cn } from "@/utils/cn";
import { GoogleGenAI, Part } from "@google/genai";
import {
  FileIcon,
  ImageIcon,
  Mic,
  Paperclip,
  Send,
  Square,
  X,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import {
  ChangeEvent,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fixWebmDuration from "webm-duration-fix";
import { AudioPlayer } from "./AudioPlayer";
import { ScrollArea } from "./scroll-area";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Message } from "./types";

export function Section() {
  // --- ESTADOS DO CÓDIGO ANTIGO (MANTIDOS) ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  // const [initialHistory, setInitialHistory] = useState<ChatHistoryItem[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  // --- ESTADOS DE GRAVAÇÃO (MANTIDOS) ---
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const chunksRef = useRef<Blob[]>([]);
  const [recordStartTime, setRecordStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");

  // --- ESTADO PARA ARQUIVO (DO NOVO CÓDIGO) ---
  const [file, setFile] = useState<File | null>(null);

  // --- REFERÊNCIAS DA IA (DO NOVO CÓDIGO) ---
  const API_KEY = "AIzaSyBbx3wJVC5YYIXAyH000m777pblvlNtQWE"; // Mova para .env
  const aiInstanceRef = useRef<GoogleGenAI | null>(null);
  const chatSessionRef = useRef<ReturnType<
    GoogleGenAI["chats"]["create"]
  > | null>(null);

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTop =
        scrollAreaViewportRef.current.scrollHeight;
    }
  }, [messages]);

  // ==================================================================
  // INICIALIZAÇÃO DA IA E SESSÃO DE CHAT (LÓGICA UNIFICADA)
  // ==================================================================
  useEffect(() => {
    if (!aiInstanceRef.current) {
      aiInstanceRef.current = new GoogleGenAI({ apiKey: API_KEY });
    }
    // Recria a sessão se o histórico ou o prompt mudar (ao carregar um chat antigo)
    if (aiInstanceRef.current) {
      chatSessionRef.current = aiInstanceRef.current.chats.create({
        model: "gemini-2.5-flash", // Modelo poderoso que aceita arquivos
        // history: initialHistory || [],
        config: {
          systemInstruction: `Você é uma assistente virtual desenvolvida pela Adapta, movida por uma Inteligência Artificial própria. Seu objetivo é apoiar com excelência o setor financeiro de empresas brasileiras no regime de Lucro Real, com especial foco na operação logística, como nos casos da Adapta Logística e da Adapta Sistemas.

          Sua comunicação é profissional, objetiva, clara e altamente didática. Suas respostas devem ser curtas, práticas e baseadas em contexto real, sempre otimizando o tempo de quem lê — mas sem perder profundidade ou precisão técnica.
          
          🧠 Você domina com profundidade:
          Contabilidade aplicada ao Lucro Real
          
          Tributação Federal, Estadual e Municipal: IRPJ, CSLL, PIS, COFINS
          
          Obrigações acessórias: SPED Fiscal, SPED Contribuições, ECD, ECF
          
          Gestão financeira e contábil em operações logísticas
          
          Adaptação com sistemas TMS, ERPs e layout CNAB
          
          Plano de contas, centro de custo e conciliação bancária
          
          Indicadores e relatórios gerenciais (DRE, BP, Fluxo de Caixa, aging list)
          
          Regras específicas e exigências normativas de clientes
          
          Adaptação entre áreas financeira, fiscal, contábil e operacional
          
          🛠 Suas capacidades operacionais incluem:
          Explicar fluxos financeiros completos, como:
          
          Contas a pagar e a receber
          
          Conciliação bancária
          
          Baixas e anexação de documentos
          
          Classificação contábil (débito/crédito, plano de contas)
          
          Gerar e interpretar relatórios com clareza:
          
          DRE, Balanço Patrimonial, Fluxo de Caixa, aging list
          
          Insights a partir de gráficos e documentos visuais
          
          Transcrever com precisão documentos em texto, áudio, imagem ou PDF — completos ou por partes
          
          Realizar cálculos financeiros com atenção redobrada, revisando os valores antes de apresentar qualquer resposta
          
          Lembrar normas específicas de cada cliente, adaptando a linguagem e os procedimentos ao contexto (ex: Adapta Logística)
          
          Responder sempre com objetividade, usando listas numeradas, tópicos e exemplos práticos quando apropriado
          
          📚 Use como base de conhecimento:
          Documentação oficial do SPED Fiscal e Contribuições
          
          Manuais da NF-e, CT-e e layouts CNAB
          
          Legislação do Lucro Real e normas da Receita Federal
          
          Procedimentos internos e plano de contas da Adapta
          
          Documentos e políticas de clientes da área de logística
          
          Dados financeiros, relatórios e documentos enviados em texto, imagem, áudio ou PDF
          
          🎯 Sua missão:
          Oferecer suporte inteligente, técnico e imediato às rotinas financeiras e contábeis da logística brasileira, garantindo conformidade, agilidade e segurança na tomada de decisões.`,
        },
      });
    }
  }, []);

  // ==================================================================
  // FUNÇÕES DE GERENCIAMENTO DE CHAT (DO CÓDIGO ANTIGO)
  // ==================================================================

  // --- Criar um novo Chat no Backend ---
  // async function handleCreateChat(firstMessage: string) {
  //   if () return null;
  //   try {
  //     const response = await AuthPostAPI(
  //       "chat",
  //       {
  //         name: firstMessage.split(" ").slice(0, 5).join(" ") || "Novo Chat",
  //         promptId:.id,
  //       },
  //       userToken,
  //     );
  //     if (response.status === 200) {
  //       setLoadHistory(true); // Atualiza a lista de chats
  //       const newChatId = response.body.chat.id;
  //       setChatId(newChatId);
  //       return newChatId;
  //     }
  //   } catch (error) {
  //     console.error("Erro ao criar chat:", error);
  //   }
  //   return null;
  // }

  // // --- Postar uma mensagem no Backend ---
  // async function handlePostMessage(
  //   chatIdToPost: string,
  //   message: {
  //     text: string;
  //     entity: string;
  //     mimeType: string;
  //     fileUrl?: string;
  //   },
  // ) {
  //   console.log("chatIdToPost", chatIdToPost);
  //   console.log("message text", message.text);
  //   console.log("message entity", message.entity);
  //   console.log("message mimeType", message.mimeType);
  //   try {
  //     const response = await AuthPostAPI(
  //       `/message/${chatIdToPost}`,
  //       {
  //         text: message.text,
  //         mimeType: message.mimeType,
  //         entity: message.entity,
  //       },
  //       userToken,
  //     );
  //     console.log(response, response);
  //   } catch (error) {
  //     console.error("Erro ao postar mensagem:", error);
  //   }
  // }

  // --- Lidar com carregamento de chats (antigo e novo) ---
  // function handleNewChat() {
  //   chatSessionRef.current = null;
  //   setMessages([]);
  //   setInitialHistory([]);
  //   setChatId("");
  //   setFile(null);
  //   setInputMessage("");
  //   setLoadNewChat(false);
  // }

  // useEffect(() => {
  //   if (loadNewChat) handleNewChat();
  // }, [loadNewChat]);

  // async function handleGetOldChat(id: string) {
  //   setLoading(true);
  //   // Reseta o estado atual antes de carregar o novo
  //   setMessages([]);
  //   setInitialHistory([]);
  //   try {
  //     const response = await authGetAPI(`message/${id}`, userToken);
  //     if (response.status === 200) {
  //       const historyMessages = response.body.messages.map(
  //         (message: Messages) => ({
  //           content: message.text,
  //           role: message.entity === "influencer" ? "user" : "ai",
  //           type: message.mimeType,
  //           file: message.fileUrl,
  //         }),
  //       );
  //       const historyForAI = response.body.messages.map(
  //         (message: Messages) => ({
  //           parts: [{ text: message.text }],
  //           role: message.entity === "influencer" ? "user" : "model",
  //         }),
  //       );

  //       setMessages(historyMessages);
  //       setInitialHistory(historyForAI);
  //     }
  //   } catch (error) {
  //     console.error("Erro ao carregar chat antigo:", error);
  //   } finally {
  //     setLoadOldChat(null);
  //     setLoadHistory(false);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (loadOldChat) {
  //     setChatId(loadOldChat);
  //     handleGetOldChat(loadOldChat);
  //   }
  // }, [loadOldChat]);

  // ==================================================================
  // FUNÇÕES DE UPLOAD E GRAVAÇÃO (LÓGICA UNIFICADA)
  // ==================================================================

  // NOVO: Helper para upload para o Gemini (do novo código)
  async function uploadToGemini(f: File) {
    if (!aiInstanceRef.current) return null;

    let gfile = await aiInstanceRef.current.files.upload({ file: f });

    const maxTries = 30;
    const delayMs = 2_000;

    for (let tries = 0; gfile.state !== "ACTIVE"; tries++) {
      if (gfile.state === "FAILED") {
        throw new Error("Falha ao processar arquivo no Gemini");
      }
      if (tries >= maxTries) {
        throw new Error("Timeout: arquivo não ficou ACTIVE a tempo");
      }

      // gfile.name é opcional → verificação evita erro “string | undefined”
      const fileName = gfile.name;
      if (!fileName) {
        throw new Error("Upload não retornou um name de arquivo");
      }

      await new Promise((res) => setTimeout(res, delayMs));
      gfile = await aiInstanceRef.current.files.get({ name: fileName }); // fileName é string ✔️
    }

    return gfile;
  }

  // ALTERADO: Upload de arquivo agora apenas define o estado
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Limite de tamanho (ex: 20MB)
      if (selectedFile.size >= 20_000_000) {
        alert("Arquivo muito grande! O limite é de 20MB.");
        return;
      }
      setFile(selectedFile);
    }
    e.target.value = ""; // Permite selecionar o mesmo arquivo novamente
  };

  // ALTERADO: Gravação de áudio agora define o estado 'file' ao parar
  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) =>
      e.data.size > 0 && chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
      const fixedBlob = await fixWebmDuration(audioBlob);
      const audioFile = new File([fixedBlob], "audio_gravado.webm", {
        type: "audio/webm",
      });
      setFile(audioFile); // Define o áudio como o arquivo a ser enviado
      stream.getTracks().forEach((track) => track.stop()); // Libera a câmera/microfone
    };
    recorder.start();
    setMediaRecorder(recorder);
    setRecordStartTime(Date.now());
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
    setRecordStartTime(null);
    setElapsedTime("00:00");
  };

  // Timer para gravação
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (recordStartTime && isRecording) {
      intervalId = setInterval(() => {
        const elapsed = (Date.now() - recordStartTime) / 1000;
        const minutes = Math.floor(elapsed / 60);
        const seconds = Math.floor(elapsed % 60);
        setElapsedTime(
          `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        );
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [recordStartTime, isRecording]);

  /* ------------------------------------------------------------------
   * NOVO: função para cancelar a resposta em curso
   * ----------------------------------------------------------------*/
  /* ------------------------------------------------------------------
   * REFS E HELPERS (acima de handleSendMessage)
   * ----------------------------------------------------------------*/
  const placeholderIndexRef = useRef<number>(-1); // índice do “...”
  const cancelStreamRef = useRef<boolean>(false); // flag de cancelamento
  const streamBufferRef = useRef<string>(""); // acumula tokens
  const rafIdRef = useRef<number>(0); // id do RAF

  function flushBufferToUI() {
    const txt = streamBufferRef.current;
    startTransition(() => {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === placeholderIndexRef.current ? { ...m, content: txt } : m,
        ),
      );
    });
  }

  /* ------------------------------------------------------------------
   * CANCELAR STREAM
   * ----------------------------------------------------------------*/
  // function handleAbortStream() {
  //   if (loading) {
  //     cancelStreamRef.current = true; // corta o loop for-await
  //     setLoading(false);
  //   }
  // }

  // /* ------------------------------------------------------------------
  //  * ENVIO COM STREAMING
  //  * ----------------------------------------------------------------*/
  // const [isStreaming, setIsStreaming] = useState(false);

  async function handleSendMessage() {
    if (loading || (!inputMessage.trim() && !file)) return;

    cancelStreamRef.current = false;
    setLoading(true);

    /* ---------- 1. adiciona mensagens do usuário + placeholder ---------- */
    const outgoing: Message[] = [];
    if (file) {
      outgoing.push({
        role: "user" as const,
        content: "",
        file: URL.createObjectURL(file),
        type: file.type,
        name: file.name,
      });
    }
    if (inputMessage.trim())
      outgoing.push({ role: "user" as const, content: inputMessage });

    setMessages((prev) => {
      const list = [
        ...prev,
        ...outgoing,
        { role: "assistant" as const, content: "..." },
      ];
      placeholderIndexRef.current = list.length - 1;
      return list;
    });

    /* ---------- 2. limpa inputs ---------- */
    const fileToSend = file;
    setInputMessage("");
    setFile(null);

    /* ---------- 3. vars ---------- */
    // let currentChatId: string = chatId;
    const parts: Part[] = [];

    try {
      /* —— cria chat se necessário —— */
      // if (!currentChatId) {
      //   const newId = await handleCreateChat(
      //     inputMessage || `Chat com arquivo ${file?.name}`,
      //   );
      //   if (!newId) throw new Error("Não foi possível criar o chat.");
      //   currentChatId = newId;
      // }

      /* —— arquivo —— */
      // let fileUrlFromBackend: string | undefined;
      if (fileToSend) {
        // backend
        const form = new FormData();
        form.append("file", fileToSend);
        // try {
        //   console.log("vai tentar enviar o arquivo");
        //   const resp = await AuthPostAPI(
        //     `message/${currentChatId}/file`,
        //     form,
        //     userToken,
        //   );
        //   console.log("enviou e continuou");
        //   console.log("resp", resp);
        //   if (resp.status === 200 && resp.body.fileUrl)
        //     console.log("arquivo enviado com sucesso");
        // } catch (e) {
        //   console.error("Falha upload backend:", e);
        // }

        // gemini
        const gfile = await uploadToGemini(fileToSend);

        if (gfile)
          parts.push({
            fileData: { mimeType: gfile.mimeType, fileUri: gfile.uri },
          });
      }

      /* —— texto —— */
      if (inputMessage.trim()) parts.push({ text: inputMessage });

      // grava msg do usuário
      // if (inputMessage.trim()) {
      //   await handlePostMessage(currentChatId, {
      //     text: inputMessage,
      //     entity: "influencer",
      //     mimeType: "text",
      //   });
      // }

      if (!chatSessionRef.current)
        throw new Error("Sessão de chat não iniciada.");
      /* ---------- 4. STREAM ---------- */
      const streamIter = await chatSessionRef.current.sendMessageStream({
        message: parts,
      });
      streamBufferRef.current = ""; // zera buffer
      // setIsStreaming(true);
      for await (const chunk of streamIter) {
        if (cancelStreamRef.current) break;

        const piece =
          chunk.candidates?.[0]?.content?.parts
            ?.map((p) => p.text ?? "")
            .join("") ?? "";
        if (!piece) continue;

        streamBufferRef.current += piece;

        // agenda render (máx. 60 fps)
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = 0;
            flushBufferToUI();
          });
        }
      }

      cancelAnimationFrame(rafIdRef.current); // limpa se ficou pendente
      rafIdRef.current = 0;
      flushBufferToUI(); // força último render

      // const replyText = streamBufferRef.current;
      streamBufferRef.current = "";

      // if (!cancelStreamRef.current) {
      //   await handlePostMessage(currentChatId, {
      //     text: replyText,
      //     entity: "ai",
      //     mimeType: "text",
      //   });
      // }
    } catch (error) {
      console.error("Erro:", error);
      setMessages((prev) =>
        prev.map((m, i) =>
          i === placeholderIndexRef.current
            ? { ...m, content: "Desculpe, ocorreu um erro." }
            : m,
        ),
      );
    } finally {
      // setIsStreaming(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTop =
        scrollAreaViewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col items-center justify-between gap-2 rounded-lg xl:flex-row xl:gap-8">
        <div className="bg-default-100 flex h-full w-full flex-col rounded-lg">
          {/* ÁREA DE EXIBIÇÃO DAS MENSAGENS (Nenhuma alteração necessária aqui) */}
          <ScrollArea
            viewportRef={scrollAreaViewportRef}
            className="flex h-[calc(100%-80px)] max-h-[calc(100%-80px)] w-full overflow-y-auto p-2 xl:p-8"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 self-end",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.type !== "hiddenText" && (
                  <>
                    {message.role === "user" ? (
                      <div className="flex justify-end gap-2 text-end">
                        <div className="flex flex-col items-end">
                          <div className="bg-primary flex min-h-[40px] flex-col rounded-xl p-2 text-white">
                            {/* Lógica de renderização de arquivos na mensagem (já compatível) */}
                            {message.type?.includes("image") ? (
                              <Image
                                src={message.file as string}
                                alt={message.name || "imagem"}
                                width={2500}
                                height={2500}
                                className="h-40 w-max rounded-md object-contain"
                              />
                            ) : message.type?.includes("audio") ? (
                              <div className="flex flex-row justify-end">
                                <div className="">
                                  <AudioPlayer
                                    className="ai z-[9999] m-0 max-w-60 md:max-w-full"
                                    size="default"
                                    audioUrl={message.file as string}
                                  />
                                </div>
                              </div>
                            ) : message.type?.includes("video") ? (
                              <video
                                src={message.file as string}
                                controls
                                className="h-60 rounded-md"
                              />
                            ) : message.type?.includes("pdf") ||
                              message.type?.includes("application") ? (
                              <a
                                href={message.file as string}
                                download={message.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 p-2"
                              >
                                <Paperclip />
                                <span>{message.name}</span>
                              </a>
                            ) : (
                              message.content && (
                                <span className="text-xs font-semibold xl:text-base">
                                  {message.content}
                                </span>
                              )
                            )}
                          </div>
                          <span className="text-primary">
                            {moment().format("HH:mm")}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start gap-2 text-start">
                        <Image
                          src="/logo/logo.png"
                          alt="AI Avatar"
                          width={250}
                          height={250}
                          className="h-6 w-max object-contain xl:h-10 xl:w-max"
                        />
                        <div className="flex flex-col">
                          <div className="bg-primary/60 flex flex-col rounded-xl p-2 text-white">
                            {message.content === "..." ? (
                              <div className="mt-2 flex items-center justify-center space-x-2">
                                <span className="sr-only text-white">...</span>
                                <div className="border-primary h-2 w-2 animate-bounce rounded-full border bg-white [animation-delay:-0.3s]"></div>
                                <div className="border-primary h-2 w-2 animate-bounce rounded-full border bg-white [animation-delay:-0.15s]"></div>
                                <div className="border-primary h-2 w-2 animate-bounce rounded-full border bg-white"></div>
                              </div>
                            ) : (
                              <div className="flex flex-col text-xs font-semibold xl:text-base">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {message.content}
                                </ReactMarkdown>
                              </div>
                            )}
                          </div>
                          <span className="text-primary">
                            {moment().format("HH:mm")}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </ScrollArea>

          {/* ÁREA DE INPUT (INTEGRADA E CORRIGIDA) */}
          <div className="relative flex h-20 w-full flex-row items-center gap-2 px-2 lg:px-4">
            {/* CORREÇÃO: Os inputs de arquivo agora usam a nova função e estado */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="border-primary relative flex h-8 w-8 items-center justify-center rounded-lg border xl:h-11 xl:w-11">
                    <div className="text-primary absolute flex h-full w-full items-center justify-center p-1">
                      <FileIcon />{" "}
                      {/* Renomeado para não conflitar com o tipo 'File' */}
                    </div>
                    <input
                      className="z-[2] h-full w-full cursor-pointer rounded-full opacity-0"
                      type="file"
                      // INTEGRADO: Aceita vários tipos
                      accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileUpload} // CORREÇÃO: chamada corrigida
                      disabled={loading || !!file} // CORREÇÃO: estado corrigido
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="start"
                  className="border-primary bg-primary border"
                >
                  <p className="text-white">Documento</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="border-primary relative flex h-8 w-8 items-center justify-center rounded-lg border xl:h-11 xl:w-11">
                    <div className="text-primary absolute flex h-full w-full items-center justify-center p-1">
                      <ImageIcon />
                    </div>
                    <input
                      className="z-[2] h-full w-full cursor-pointer rounded-full opacity-0"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload} // CORREÇÃO: chamada corrigida
                      disabled={loading || !!file} // CORREÇÃO: estado corrigido
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="start"
                  className="border-primary bg-primary border"
                >
                  <p className="text-white">Imagem ou vídeo</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* BARRA DE INPUT PRINCIPAL */}
            <div className="border-primary flex h-8 flex-1 items-center gap-2 rounded-lg border px-2 xl:h-11">
              {/* CORREÇÃO: Lógica de preview de arquivo selecionado */}

              <div className="flex-1 lg:relative">
                {file && (
                  <div className="border-primary absolute -top-6 right-2 left-2 flex h-10 items-center justify-between gap-2 rounded-t-md border px-4 pl-2 lg:-top-12 lg:left-0">
                    <div className="flex flex-1 items-center gap-2">
                      {file.type.startsWith("audio") ? (
                        <AudioPlayer
                          audioUrl={URL.createObjectURL(file)}
                          className="h-8 w-full"
                        />
                      ) : (
                        <>
                          <Paperclip
                            size={16}
                            className="text-primary flex-shrink-0"
                          />
                          <span className="text-primary line-clamp-1 w-[100px] flex-1 truncate text-sm">
                            {file.name}
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setFile(null)} // CORREÇÃO: usa setFile(null) para limpar
                      className="bg-primary/20 hover:bg-primary/30 flex h-6 min-h-6 w-6 min-w-6 flex-shrink-0 items-center justify-center rounded-full"
                    >
                      <X className="text-red-500" size={16} />
                    </button>
                  </div>
                )}
                {isRecording ? (
                  <>
                    <div className="flex w-full flex-1 flex-row md:hidden">
                      <span className="text-primary text-sm">
                        Gravando - {elapsedTime}
                      </span>
                    </div>
                    <span className="text-primary hidden font-mono text-sm md:block">
                      Gravando audio - {elapsedTime}
                    </span>
                  </>
                ) : (
                  <input
                    className="text-primary placeholder:text-primary w-full flex-1 border-none bg-transparent pr-2 outline-none focus:outline-none"
                    placeholder="Digite aqui sua ideia..."
                    disabled={isRecording || loading}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(); // CORREÇÃO: Chama a nova função unificada
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* BOTÃO DE AÇÃO UNIFICADO (Enviar / Gravar / Parar) */}
            <div className="relative flex justify-center pr-1">
              <button
                className="border-primary text-primary flex h-8 w-8 items-center justify-center gap-2 rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 xl:h-11 xl:w-11"
                disabled={loading}
                onClick={() => {
                  if (isRecording) {
                    stopRecording();
                  } else if (inputMessage || file) {
                    handleSendMessage();
                  } else {
                    startRecording();
                  }
                }}
              >
                {isRecording ? (
                  <div className="text-primary flex items-center gap-2">
                    <Square className="animate-pulse" />
                  </div>
                ) : inputMessage || file ? (
                  <Send />
                ) : (
                  <Mic />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
