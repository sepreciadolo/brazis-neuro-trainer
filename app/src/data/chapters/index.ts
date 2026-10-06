import type { Question, ChapterMeta } from '../../types'
import chapter01Data from './chapter01.json'
import chapter02Data from './chapter02.json'
import chapter03Data from './chapter03.json'
import chapter04Data from './chapter04.json'
import chapter05Data from './chapter05.json'
import chapter06Data from './chapter06.json'
import chapter07Data from './chapter07.json'
import chapter08Data from './chapter08.json'
import chapter09Data from './chapter09.json'
import chapter10Data from './chapter10.json'
import chapter11Data from './chapter11.json'
import chapter12Data from './chapter12.json'
import chapter13Data from './chapter13.json'
import chapter14Data from './chapter14.json'
import chapter15Data from './chapter15.json'
import chapter16Data from './chapter16.json'
import chapter17Data from './chapter17.json'
import chapter18Data from './chapter18.json'
import chapter19Data from './chapter19.json'
import chapter20Data from './chapter20.json'
import chapter21Data from './chapter21.json'
import chapter22Data from './chapter22.json'
import chapter23Data from './chapter23.json'

export const CHAPTERS_REGISTRY: Record<string, Question[]> = {
  'Principles': chapter01Data as Question[],
  'Peripheral Nerves': chapter02Data as Question[],
  'Plexuses': chapter03Data as Question[],
  'Spinal Roots': chapter04Data as Question[],
  'Spinal Cord': chapter05Data as Question[],
  'CN I (Olfactory)': chapter06Data as Question[],
  'Visual Pathways': chapter07Data as Question[],
  'Ocular Motor': chapter08Data as Question[],
  'CN V (Trigeminal)': chapter09Data as Question[],
  'CN VII (Facial)': chapter10Data as Question[],
  'CN VIII (Vestibulocochlear)': chapter11Data as Question[],
  'CN IX & X': chapter12Data as Question[],
  'CN XI (Accessory)': chapter13Data as Question[],
  'CN XII (Hypoglossal)': chapter14Data as Question[],
  'Brainstem': chapter15Data as Question[],
  'Cerebellum': chapter16Data as Question[],
  'Hypothalamus': chapter17Data as Question[],
  'Thalamus': chapter18Data as Question[],
  'Basal Ganglia': chapter19Data as Question[],
  'Cerebral Cortex': chapter20Data as Question[],
  'Autonomic Nervous System': chapter21Data as Question[],
  'Vascular Syndromes': chapter22Data as Question[],
  'Coma & Herniation': chapter23Data as Question[],
}

export const CHAPTERS_META: ChapterMeta[] = [
  {
    id: 'Principles',
    chapterNumber: 1,
    title: 'General Principles of Neurologic Localization',
    description: "Upper vs Lower motor neuron, cortical vs subcortical signs, and diagnostic patterns.",
    totalQuestions: chapter01Data.length,
    pdfPages: '1–30'
  },
  {
    id: 'Peripheral Nerves',
    chapterNumber: 2,
    title: 'Peripheral Nerves',
    description: "Median, ulnar, radial, fibular, and femoral entrapment neuropathies and differentiations.",
    totalQuestions: chapter02Data.length,
    pdfPages: '31–82'
  },
  {
    id: 'Plexuses',
    chapterNumber: 3,
    title: 'Cervical, Brachial, & Lumbosacral Plexuses',
    description: "Erb-Duchenne, Klumpke, Parsonage-Turner, thoracic outlet, and lumbosacral plexopathies.",
    totalQuestions: chapter03Data.length,
    pdfPages: '83–100'
  },
  {
    id: 'Spinal Roots',
    chapterNumber: 4,
    title: 'Spinal Nerve and Root',
    description: "Cervical and lumbosacral radiculopathies; conus medullaris vs cauda equina.",
    totalQuestions: chapter04Data.length,
    pdfPages: '101–110'
  },
  {
    id: 'Spinal Cord',
    chapterNumber: 5,
    title: 'Spinal Cord',
    description: "Brown-S\u00e9quard, anterior spinal artery, central cord, subacute combined degeneration, and myelopathies.",
    totalQuestions: chapter05Data.length,
    pdfPages: '111–140'
  },
  {
    id: 'CN I (Olfactory)',
    chapterNumber: 6,
    title: 'Cranial Nerve I (Olfactory Nerve)',
    description: "Foster Kennedy syndrome, olfactory groove tumors, and Kallmann syndrome.",
    totalQuestions: chapter06Data.length,
    pdfPages: '141–150'
  },
  {
    id: 'Visual Pathways',
    chapterNumber: 7,
    title: 'Visual Pathways',
    description: "Optic chiasm, Meyer loop vs Baum loop, occipital stroke with macular sparing, and visual agnosias.",
    totalQuestions: chapter07Data.length,
    pdfPages: '151–196'
  },
  {
    id: 'Ocular Motor',
    chapterNumber: 8,
    title: 'The Ocular Motor System (CN III, IV, VI)',
    description: "Pupil-sparing diabetic CN III, Bielschowsky head tilt CN IV, and internuclear ophthalmoplegia.",
    totalQuestions: chapter08Data.length,
    pdfPages: '197–352'
  },
  {
    id: 'CN V (Trigeminal)',
    chapterNumber: 9,
    title: 'Cranial Nerve V (Trigeminal Nerve)',
    description: "Nuclear division, cavernous sinus vs superior orbital fissure, and facial dissociated sensory loss.",
    totalQuestions: chapter09Data.length,
    pdfPages: '353–368'
  },
  {
    id: 'CN VII (Facial)',
    chapterNumber: 10,
    title: 'Cranial Nerve VII (Facial Nerve)',
    description: "UMN vs LMN facial palsy, topodiagnosis, petrous temporal course, and hyperacusis.",
    totalQuestions: chapter10Data.length,
    pdfPages: '369–390'
  },
  {
    id: 'CN VIII (Vestibulocochlear)',
    chapterNumber: 11,
    title: 'Cranial Nerve VIII (Vestibulocochlear)',
    description: "CPA vestibular schwannoma, BPPV Dix-Hallpike mechanics, and central vs peripheral nystagmus.",
    totalQuestions: chapter11Data.length,
    pdfPages: '391–410'
  },
  {
    id: 'CN IX & X',
    chapterNumber: 12,
    title: 'Cranial Nerves IX and X (Glossopharyngeal & Vagus)',
    description: "Jugular foramen (Vernet syndrome), nucleus ambiguus vocal cord palsies, and gag reflex anatomy.",
    totalQuestions: chapter12Data.length,
    pdfPages: '411–418'
  },
  {
    id: 'CN XI (Accessory)',
    chapterNumber: 13,
    title: 'Cranial Nerve XI (Spinal Accessory Nerve)',
    description: "Posterior cervical triangle biopsy injuries, trapezius vs SCM localization, and scapular winging.",
    totalQuestions: chapter13Data.length,
    pdfPages: '419–428'
  },
  {
    id: 'CN XII (Hypoglossal)',
    chapterNumber: 14,
    title: 'Cranial Nerve XII (Hypoglossal Nerve)',
    description: "Tapia syndrome, hypoglossal canal lesions, tongue deviation, and lower motor neuron fasciculations.",
    totalQuestions: chapter14Data.length,
    pdfPages: '429–438'
  },
  {
    id: 'Brainstem',
    chapterNumber: 15,
    title: 'Brainstem (Midbrain, Pons, Medulla)',
    description: "Wallenberg, Dejerine, Millard-Gubler, Foville, Raymond, Weber, Benedikt, and Claude syndromes.",
    totalQuestions: chapter15Data.length,
    pdfPages: '439–460'
  },
  {
    id: 'Cerebellum',
    chapterNumber: 16,
    title: 'The Cerebellum',
    description: "Anterior vermis degeneration vs hemispheric dysmetria; cerebellar peduncles and ataxia circuits.",
    totalQuestions: chapter16Data.length,
    pdfPages: '461–478'
  },
  {
    id: 'Hypothalamus',
    chapterNumber: 17,
    title: 'Hypothalamus & Neuroendocrine System',
    description: "Central diabetes insipidus, Wernicke encephalopathy, and neuroendocrine hypothalamic nuclei.",
    totalQuestions: chapter17Data.length,
    pdfPages: '479–500'
  },
  {
    id: 'Thalamus',
    chapterNumber: 18,
    title: 'Thalamus',
    description: "D\u00e9jerine-Roussy VPL/VPM thalamic pain syndrome and artery of Percheron bilateral infarctions.",
    totalQuestions: chapter18Data.length,
    pdfPages: '501–528'
  },
  {
    id: 'Basal Ganglia',
    chapterNumber: 19,
    title: 'Basal Ganglia',
    description: "Hemiballismus subthalamic nucleus, Huntington indirect pathway, and movement disorder circuits.",
    totalQuestions: chapter19Data.length,
    pdfPages: '529–568'
  },
  {
    id: 'Cerebral Cortex',
    chapterNumber: 20,
    title: 'Cerebral Cortex',
    description: "Gerstmann angular gyrus syndrome, B\u00e1lint parieto-occipital syndrome, and higher cortical functions.",
    totalQuestions: chapter20Data.length,
    pdfPages: '569–640'
  },
  {
    id: 'Autonomic Nervous System',
    chapterNumber: 21,
    title: 'Autonomic Nervous System',
    description: "First vs second vs third order Horner syndrome pharmacologic localization and autonomic failure.",
    totalQuestions: chapter21Data.length,
    pdfPages: '641–652'
  },
  {
    id: 'Vascular Syndromes',
    chapterNumber: 22,
    title: 'Vascular Syndromes',
    description: "ACA paracentral lobule leg weakness and ACA-MCA watershed \\\"man-in-a-barrel\\\" borderzone infarction.",
    totalQuestions: chapter22Data.length,
    pdfPages: '653–688'
  },
  {
    id: 'Coma & Herniation',
    chapterNumber: 23,
    title: 'Localization of Lesions Causing Coma',
    description: "Uncal herniation, central transtentorial deterioration, and Kernohan notch false-localizing signs.",
    totalQuestions: chapter23Data.length,
    pdfPages: '689–720'
  },
]

export function getAllQuestions(): Question[] {
  const all: Question[] = []
  for (const questions of Object.values(CHAPTERS_REGISTRY)) {
    all.push(...questions)
  }
  return all
}

export function getQuestionsByChapter(chapter: string): Question[] {
  return CHAPTERS_REGISTRY[chapter] || []
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find(q => q.id === id)
}
