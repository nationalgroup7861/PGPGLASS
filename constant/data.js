import { UserIcon } from "@heroicons/react/24/outline";

export const menuItems = [
  {
    isHeadr: true,
    title: "menu",
  },

  {
    title: "Dashboard",
    isHide: true,
    icon: "heroicons-outline:home",
    link: "pgp",
  },

  {
    title: "User",
    icon: "heroicons-outline:user",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "User",
        childlink: "user",
      },
      {
        childtitle: "Add User",
        childlink: "adduser",
      },
    ],
  },
 
];

export const navigation = [
  {
    name: "Glass GPT",
    description: "Explore the power of ChatGPT-4.",
    link: "service",
    icon: "./icon/glass_gpt_icon.png",
    current: true,
  },

  {
    name: "GPT 3.5",
    description: "Explore the power of ChatGPT-4.",
    link: "gpt",
    icon: "/icon/gpt3.5_icon.png",
    current: false,
  },

  {
    name: "PGP-ProInsights",
    description:
      "Unlock innovation with InternalGPT, your AI companion for internal tasks",
    link: "internalgpt",
    current: false,
    icon: "/icon/props_gpt_icon.png",
  },

  {
    name: "ALFIE(Rebranding)",
    description:
      "Unlock innovation with InternalGPT, your AI companion for internal tasks",
    link: "alfie",
    current: false,
    icon: "/icon/glass_gpt_icon2.png",
  },
    {
    name: "Research GPT",
    description:
      "Unlock innovation with InternalGPT, your AI companion for internal tasks",
    link: "researchgpt",
    current: false,
    icon: "/icon/research_gpt_icon.png",
  },
    {
    name: "Design Craft",
    description:
      "Unlock innovation with InternalGPT, your AI companion for internal tasks",
    link: "designcraft",
    current: false,
    icon: "/icon/draft_gpt_icon.png",
  },
];

export const tabs = [
  { name: "All", href: "#", current: false },
  { name: "Market Research", href: "#", current: true },
  { name: "Competitor Information", href: "#", current: false },
  { name: "New Trends", href: "#", current: false },
  { name: "Import Export", href: "#", current: false },
];

export const cardData = [
  {
    statement:
      "What is total Market Growth For [Category] in [Region] for the last 5 years and projection for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Market Research",
  },
  {
    statement:
      "[Category] Producers of the same in the [Region] with their revenue,EBIDTA, PAT for last 5 years and projection for next 3 years",
    icon: UserIcon, // Replace with your actual icon component
    category: "Market Research",
  },
  {
    statement:
      "Are their any major regulatory restriction for importing [Category] bottles into [Region] from India or Srilanka?.",
    icon: UserIcon, // Replace with your actual icon component
    category: "Market Research",
  },

  {
    statement:
      "Can you provide a detailed comparison of market shares held by the top competitors in [Category] within [Region] over the past 5 years, along with a forecast for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "What are the recent trends in customer preferences and demand in the [Category] sector in [Region] for the last 5 years, and how are these expected to evolve in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "Could you analyse the key drivers and challenges that have affected the [Category] market in [Region] in the past 5 years, and predict their impact over the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "Please provide an analysis of the entry and exit of major competitors in the [Category] market in [Region] over the last 5 years, and predict any potential market entries or exits in the next 3 years.",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },
  {
    statement:
      "I need an overview of the technological advancements and innovations introduced by competitors in the [Category] field in [Region] during the last 5 years, with an outlook for the coming 3 years.",
    icon: UserIcon, // Replace with your actual icon component
    category: "Competitor Information",
  },

  {
    statement:
      "Can you provide an analysis of the latest technological innovations in the glass bottle manufacturing industry, including their impact on market growth in [Region] over the past 5 years and projected influence for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },

  {
    statement:
      "What are the emerging sustainable practices in the glass bottle manufacturing industry, and how have these practices influenced market growth in [Region] for the last 5 years, with projections for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },

  {
    statement:
      "How has consumer demand for different types of glass bottles (e.g., colored, shaped, recycled) evolved in [Region] over the past 5 years, and what are the growth projections for these categories in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },
  {
    statement:
      "What role have regulatory changes played in shaping the market growth of the glass bottle manufacturing industry in [Region] over the last 5 years, and what is the expected impact in the coming 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },
  {
    statement:
      "Can you assess the competitive landscape changes in the glass bottle manufacturing industry in [Region] over the past 5 years, including new entrants and market exits, and forecast their impact on market growth for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "New Trends",
  },

  {
    statement:
      "Could you provide a detailed analysis of the export trends and volumes for the glass bottle manufacturing industry in [Region] over the past 5 years, and offer projections for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "What are the key import sources for glass bottles in [Region], how have these sources changed over the last 5 years, and what are the expected trends for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "How have international trade policies impacted the import and export dynamics in the glass bottle manufacturing industry in [Region] over the past 5 years, and what are the potential impacts anticipated in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "Can you identify the major global competitors in the glass bottle manufacturing industry that have influenced the import and export market in [Region] over the last 5 years, and predict their role in the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
  {
    statement:
      "What are the emerging technological innovations in the glass bottle manufacturing industry globally, and how have they affected the import and export market in [Region] over the past 5 years with a forecast for the next 3 years?",
    icon: UserIcon, // Replace with your actual icon component
    category: "Import Export",
  },
];

export const selectToSAS = [
  { id: 1, name: "Beer Bottle" },
  { id: 2, name: "Cosmetic" },
  { id: 3, name: "Perfumery" },
  { id: 4, name: "Food Jars" },
  { id: 5, name: "Speciality liquor" },
  { id: 6, name: "Wine" },
  { id: 7, name: "Nail polish" },
  { id: 8, name: "Room freshener" },
  { id: 9, name: "Pharma bottle" },
];
export const selectToCountry = [
  { id: 1, name: "Mexico" },
  { id: 2, name: "United States" },
  { id: 3, name: "UAE" },
  { id: 4, name: "Canada" },
  { id: 5, name: "Brazil" },
  { id: 6, name: "Europe" },
  { id: 7, name: "France" },
  { id: 8, name: "China" },
  { id: 9, name: "Vietnam" },
  { id: 10, name: "Spain" },
  { id: 11, name: "India" },
];



export const topMenu = [
  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "/app/home",
    child: [
    
      {
        childtitle: "CRM Dashboard",
        childlink: "crm",
        childicon: "ri:customer-service-2-fill",
      },
    
    ],
  },
  
];

export const notifications = [
  {
    title: "Your order is placed",
    desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",

    image: "/assets/images/all-img/user.png",
    link: "#",
  },
  {
    title: "Congratulations Darlene  🎉",
    desc: "Won the monthly best seller badge",
    unread: true,
    image: "/assets/images/all-img/user2.png",
    link: "#",
  },
  {
    title: "Revised Order 👋",
    desc: "Won the monthly best seller badge",

    image: "/assets/images/all-img/user3.png",
    link: "#",
  },
  {
    title: "Brooklyn Simmons",
    desc: "Added you to Top Secret Project group...",

    image: "/assets/images/all-img/user4.png",
    link: "#",
  },
];

export const message = [
  {
    title: "Wade Warren",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: "/assets/images/all-img/user1.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "/assets/images/all-img/user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "/assets/images/all-img/user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "/assets/images/all-img/user4.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "/assets/images/all-img/user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "/assets/images/all-img/user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "/assets/images/all-img/user4.png",
    link: "#",
  },
];

export const colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const topFilterLists = [
  {
    name: "Inbox",
    value: "all",
    icon: "uil:image-v",
  },
  {
    name: "Starred",
    value: "fav",
    icon: "heroicons:star",
  },
  {
    name: "Sent",
    value: "sent",
    icon: "heroicons-outline:paper-airplane",
  },

  {
    name: "Drafts",
    value: "drafts",
    icon: "heroicons-outline:pencil-alt",
  },
  {
    name: "Spam",
    value: "spam",
    icon: "heroicons:information-circle",
  },
  {
    name: "Trash",
    value: "trash",
    icon: "heroicons:trash",
  },
];

export const bottomFilterLists = [
  {
    name: "personal",
    value: "personal",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Social",
    value: "social",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Promotions",
    value: "promotions",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Business",
    value: "business",
    icon: "heroicons:chevron-double-right",
  },
];

export const meets = [
  {
    img: "/assets/images/svg/sk.svg",
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
  {
    img: "/assets/images/svg/path.svg",
    title: "Design meeting (team)",
    date: "01 Nov 2021",
    meet: "Skyp meeting",
  },
  {
    img: "/assets/images/svg/dc.svg",
    title: "Background research",
    date: "01 Nov 2021",
    meet: "Google meeting",
  },
  {
    img: "/assets/images/svg/sk.svg",
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
];

export const files = [
  {
    img: "/assets/images/icon/file-1.svg",
    title: "Dashboard.fig",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/pdf-1.svg",
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/zip-1.svg",
    title: "Job portal_app.zip",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/pdf-2.svg",
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/scr-1.svg",
    title: "Screenshot.jpg",
    date: "06 June 2021 / 155MB",
  },
];
