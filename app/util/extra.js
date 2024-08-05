import { marked } from "marked";

export const generateChatKey = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `chat_${timestamp}_${randomNumber}`;
  };

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
      category: "Market Research",
    },
    {
      statement:
        "[Category] Producers of the same in the [Region] with their revenue,EBIDTA, PAT for last 5 years and projection for next 3 years",
      category: "Market Research",
    },
    {
      statement:
        "Are their any major regulatory restriction for importing [Category] bottles into [Region] from India or Srilanka?.",
      category: "Market Research",
    },
  
    {
      statement:
        "Can you provide a detailed comparison of market shares held by the top competitors in [Category] within [Region] over the past 5 years, along with a forecast for the next 3 years?",
      category: "Competitor Information",
    },
    {
      statement:
        "What are the recent trends in customer preferences and demand in the [Category] sector in [Region] for the last 5 years, and how are these expected to evolve in the next 3 years?",
      category: "Competitor Information",
    },
    {
      statement:
        "Could you analyse the key drivers and challenges that have affected the [Category] market in [Region] in the past 5 years, and predict their impact over the next 3 years?",
      category: "Competitor Information",
    },
    {
      statement:
        "Please provide an analysis of the entry and exit of major competitors in the [Category] market in [Region] over the last 5 years, and predict any potential market entries or exits in the next 3 years.",
      category: "Competitor Information",
    },
    {
      statement:
        "I need an overview of the technological advancements and innovations introduced by competitors in the [Category] field in [Region] during the last 5 years, with an outlook for the coming 3 years.",
      category: "Competitor Information",
    },
  
    {
      statement:
        "Can you provide an analysis of the latest technological innovations in the glass bottle manufacturing industry, including their impact on market growth in [Region] over the past 5 years and projected influence for the next 3 years?",
      category: "New Trends",
    },
  
    {
      statement:
        "What are the emerging sustainable practices in the glass bottle manufacturing industry, and how have these practices influenced market growth in [Region] for the last 5 years, with projections for the next 3 years?",
      category: "New Trends",
    },
  
    {
      statement:
        "How has consumer demand for different types of glass bottles (e.g., colored, shaped, recycled) evolved in [Region] over the past 5 years, and what are the growth projections for these categories in the next 3 years?",
      category: "New Trends",
    },
    {
      statement:
        "What role have regulatory changes played in shaping the market growth of the glass bottle manufacturing industry in [Region] over the last 5 years, and what is the expected impact in the coming 3 years?",
      category: "New Trends",
    },
    {
      statement:
        "Can you assess the competitive landscape changes in the glass bottle manufacturing industry in [Region] over the past 5 years, including new entrants and market exits, and forecast their impact on market growth for the next 3 years?",
      category: "New Trends",
    },
  
    {
      statement:
        "Could you provide a detailed analysis of the export trends and volumes for the glass bottle manufacturing industry in [Region] over the past 5 years, and offer projections for the next 3 years?",
      category: "Import Export",
    },
    {
      statement:
        "What are the key import sources for glass bottles in [Region], how have these sources changed over the last 5 years, and what are the expected trends for the next 3 years?",
      category: "Import Export",
    },
    {
      statement:
        "How have international trade policies impacted the import and export dynamics in the glass bottle manufacturing industry in [Region] over the past 5 years, and what are the potential impacts anticipated in the next 3 years?",
      category: "Import Export",
    },
    {
      statement:
        "Can you identify the major global competitors in the glass bottle manufacturing industry that have influenced the import and export market in [Region] over the last 5 years, and predict their role in the next 3 years?",
      category: "Import Export",
    },
    {
      statement:
        "What are the emerging technological innovations in the glass bottle manufacturing industry globally, and how have they affected the import and export market in [Region] over the past 5 years with a forecast for the next 3 years?",
      category: "Import Export",
    },
  ];
    

  export const createMarkup = (text) => {
    // Optionally convert markdown to HTML
    const html = marked(text);
    return { __html: html };
  };


