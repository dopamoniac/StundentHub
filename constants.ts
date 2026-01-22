
import { Subject, Document } from './types';

export const SUBJECTS: Subject[] = [
  { id: '1', name: "Management de Projet", icon: "📊", description: "Planification, méthodes Agile/Scrum, suivi des coûts et gestion de ressources.", category: "Core" },
  { id: '2', name: "Théorie des Organisations", icon: "🏗️", description: "Analyse des structures, culture d'entreprise, leadership et théories classiques/modernes.", category: "Core" },
  { id: '3', name: "RSE", icon: "🌍", description: "Responsabilité Sociétale et Environnementale. Enjeux éthiques et durabilité.", category: "Ethics" },
  { id: '4', name: "Qualité", icon: "🏆", description: "Normes ISO 9001, Six Sigma, gestion de la qualité totale (TQM) et amélioration continue.", category: "Operations" },
  { id: '5', name: "Gestion des Risques", icon: "🛡️", description: "Identification, analyse de vulnérabilité et stratégies de mitigation des risques critiques.", category: "Operations" },
  { id: '6', name: "Analyse Quali/Quanti", icon: "📉", description: "Statistiques appliquées, sondages, outils d'analyse de données et prise de décision.", category: "Analytics" },
  { id: '7', name: "Gestion de Conflits", icon: "🤝", description: "Médiation, techniques de négociation, communication non-violente et dynamique de groupe.", category: "HR" },
  { id: '8', name: "Étude de Cas", icon: "🔍", description: "Synthèse des connaissances transversales via l'analyse de cas d'entreprises réelles.", category: "Practical" },
  { id: '9', name: "Anglais Business", icon: "🇬🇧", description: "Communication professionnelle, vocabulaire technique et présentations stratégiques.", category: "Communication" }
];

export const DOCUMENTS: Document[] = [
  // Project Management - Nefissa Boudali
  { id: '101', title: "Management de Projet: Chapitres 1-2-3", type: "Course", subjectId: '1', author: "Prof. Nefissa Boudali", url: "YOUR_URL_HERE" },
  { id: '102', title: "Planification et Agile: Chapitres 4-5-6", type: "Course", subjectId: '1', author: "Prof. Nefissa Boudali", url: "YOUR_URL_HERE" },
  { id: '103', title: "Examen Blanc: Gestion de Projet", type: "Exam", subjectId: '1', author: "Prof. Nefissa Boudali", url: "YOUR_URL_HERE" },
  
  // TO - KBHM
  { id: '201', title: "Cours Complet Théorie des Organisations", type: "Course", subjectId: '2', author: "KBHM", url: "YOUR_URL_HERE" },
  { id: '202', title: "Synthèse: Structures et Cultures", type: "Support", subjectId: '2', author: "KBHM", url: "YOUR_URL_HERE" },
  
  // RSE - Nour Ben Geudria
  { id: '301', title: "RSE Chapitre 2: Les Enjeux Stratégiques", type: "Course", subjectId: '3', author: "Nour Ben Geudria", url: "YOUR_URL_HERE" },
  { id: '302', title: "Guide de l'audit RSE", type: "Support", subjectId: '3', author: "Nour Ben Geudria", url: "YOUR_URL_HERE" },
  
  // Analyse - Olfa Bouhlel
  { id: '601', title: "Principale 2024 avec corrigé détaillé", type: "Exam", subjectId: '6', author: "Olfa Bouhlel", url: "YOUR_URL_HERE" },
  { id: '602', title: "TP Analyse de Données Quanti", type: "Practical", subjectId: '6', author: "Olfa Bouhlel", url: "YOUR_URL_HERE" },
  
  // Conflict - Prof D
  { id: '701', title: "Gestion de Conflit: Module Complet", type: "Course", subjectId: '7', author: "Prof. D", url: "YOUR_URL_HERE" },
  { id: '702', title: "Fiches de Médiation Pratique", type: "Support", subjectId: '7', author: "Prof. D", url: "YOUR_URL_HERE" },
  
  // Quality
  { id: '401', title: "Introduction aux Normes ISO", type: "Course", subjectId: '4', author: "Management Team", url: "YOUR_URL_HERE" },
  
  // Risk
  { id: '501', title: "Matrice des Risques: Méthodologie", type: "Course", subjectId: '5', author: "Expert Risk", url: "YOUR_URL_HERE" }
];
