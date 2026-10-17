export const landings = {
  "es": {
    "title": "Arquitectura de IA para operaciones reales",
    "description": "Consultoría en arquitectura de IA, diseño de agentes y revisión de sistemas antes de su puesta en producción.",
    "hero": "Agentes de IA que hacen el trabajo.",
    "intro": "Soy Ostap Kovalisko, Chief Architect y fundador de Eucalipse. Ayudo a los equipos a diseñar agentes con límites claros, revisión humana y acciones trazables.",
    "cta": "Hablemos de tu proyecto",
    "services": "Dónde puedo ayudarte",
    "items": [
      [
        "Revisión de arquitectura",
        "Identificar riesgos en los flujos de datos, los permisos, las integraciones y la ejecución de acciones. Definir qué conviene cambiar primero."
      ],
      [
        "Diseño de agentes",
        "Convertir una necesidad operativa en un flujo concreto: qué puede hacer el agente, qué debe comprobar y cuándo necesita aprobación."
      ],
      [
        "Preparación para producción",
        "Revisar evaluaciones, observabilidad, reintentos y recuperación ante fallos antes de ampliar la autonomía del sistema."
      ]
    ],
    "process": "Empezamos por un problema concreto",
    "processText": "Cuéntame qué proceso quieres mejorar, qué existe hoy y dónde se atasca. Primero acordamos el alcance y el resultado esperado; después, el trabajo técnico.",
    "availability": "Acepto proyectos seleccionados compatibles con mis compromisos actuales. Las colaboraciones se pueden organizar directamente o a través de Eucalipse.",
    "reading": "Cómo pienso sobre estos sistemas",
    "article": "La atención humana es ahora el cuello de botella",
    "articleText": "Una propuesta para diseñar la revisión alrededor de la evidencia, la incertidumbre y el coste de un error.",
    "english": "Leer el artículo en inglés",
    "contact": "Cuéntame qué estás construyendo",
    "contactText": "Describe el problema, el estado actual del sistema y tus plazos. Acordaremos el idioma de las reuniones y de los entregables antes de empezar.",
    "name": "Nombre",
    "email": "Correo electrónico",
    "message": "Mensaje",
    "send": "Enviar mensaje",
    "sending": "Enviando…",
    "sent": "Mensaje enviado.",
    "thanks": "Gracias. Me pondré en contacto contigo para hablar de los próximos pasos.",
    "error": "No se ha podido enviar el mensaje. Puedes escribirme a",
    "note": "Utilizaré tus datos para responder a tu consulta."
  },
  "fr": {
    "title": "Architecture IA pour les opérations métier",
    "description": "Conseil en architecture IA, conception d’agents et revue des systèmes avant leur mise en production.",
    "hero": "Des agents IA qui font avancer le travail.",
    "intro": "Je suis Ostap Kovalisko, Chief Architect et fondateur d’Eucalipse. J’aide les équipes à concevoir des agents aux limites explicites, avec une validation humaine et des actions traçables.",
    "cta": "Parlons de votre projet",
    "services": "Comment je peux vous aider",
    "items": [
      [
        "Revue d’architecture",
        "Identifier les risques liés aux données, aux autorisations, aux intégrations et à l’exécution des actions. Définir les changements prioritaires."
      ],
      [
        "Conception d’agents",
        "Traduire un besoin opérationnel en un processus concret : ce que l’agent peut faire, ce qu’il doit vérifier et quand une validation est nécessaire."
      ],
      [
        "Préparation à la production",
        "Examiner les évaluations, l’observabilité, les nouvelles tentatives et la reprise après incident avant d’accroître l’autonomie du système."
      ]
    ],
    "process": "Partons d’un problème concret",
    "processText": "Expliquez-moi le processus à améliorer, ce qui existe aujourd’hui et les points de blocage. Nous convenons d’abord du périmètre et du résultat attendu, puis du travail technique.",
    "availability": "J’accepte des missions sélectionnées, compatibles avec mes engagements actuels. Elles peuvent être organisées directement ou par l’intermédiaire d’Eucalipse.",
    "reading": "Mon approche de ces systèmes",
    "article": "L’attention humaine est devenue le facteur limitant",
    "articleText": "Une proposition pour organiser la revue autour des preuves, de l’incertitude et du coût d’une erreur.",
    "english": "Lire l’article en anglais",
    "contact": "Parlez-moi de votre projet",
    "contactText": "Décrivez le problème, l’état actuel du système et vos délais. Nous conviendrons de la langue des réunions et des livrables avant de commencer.",
    "name": "Nom",
    "email": "Adresse e-mail",
    "message": "Message",
    "send": "Envoyer le message",
    "sending": "Envoi…",
    "sent": "Message envoyé.",
    "thanks": "Merci. Je vous recontacterai pour discuter des prochaines étapes.",
    "error": "Le message n’a pas pu être envoyé. Vous pouvez m’écrire à",
    "note": "Vos coordonnées serviront à répondre à votre demande."
  }
} as const;
export type LandingLocale = keyof typeof landings;
