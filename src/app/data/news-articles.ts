export interface NewsArticle {
  id: string;
  title: string;
  tags: string[];
  date: string;
  bodyParagraphs: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'launch-of-the-updated-personal-data-protection-system',
    title: 'Launch of the Updated Personal Data Protection System',
    tags: ['PDPL'],
    date: '2026-08-04',
    bodyParagraphs: [
      'The National Data Management Office (NDMO) announced the rollout of an updated version of the Personal Data Protection System, aimed at strengthening data governance and personal data protection across the Kingdom.',
      'The update introduces clearer guidelines and procedures for entities subject to the Personal Data Protection Law, helping them assess and demonstrate compliance more efficiently.',
      'The update includes clear guidance for data subjects on exercising their rights, along with a flexible grace period to allow entities to adjust and comply gradually, in addition to consultative support from the Office to guide national entities.',
    ],
  },
  {
    id: 'workshop-on-national-data-governance',
    title: 'Workshop on National Data Governance',
    tags: ['NDMO', 'SDAIA'],
    date: '2026-08-01',
    bodyParagraphs: [
      'SDAIA and the National Data Management Office hosted a joint workshop bringing together representatives from government and private entities to discuss best practices in national data governance.',
      'Sessions covered data classification, sharing frameworks, and the practical steps entities can take to align with the National Data Governance Platform.',
    ],
  },
  {
    id: 'update-to-digital-governance-policies-for-government-entities',
    title: 'Update to Digital Governance Policies for Government Entities',
    tags: ['PDPL', 'NDMO'],
    date: '2026-08-05',
    bodyParagraphs: [
      'New digital governance policy updates have been issued for government entities, clarifying responsibilities around personal data handling and inter-agency data sharing.',
      'Entities are encouraged to review the updated policies and align internal procedures ahead of the upcoming compliance review cycle.',
    ],
  },
  {
    id: 'launch-ceremony-of-the-national-data-strategy',
    title: 'Launch Ceremony of the National Data Strategy',
    tags: ['NDMO'],
    date: '2026-08-02',
    bodyParagraphs: [
      'The National Data Management Office held the official launch ceremony for the National Data Strategy, setting out a roadmap for data-driven transformation across the Kingdom.',
      'The strategy outlines key initiatives spanning data infrastructure, governance, and capability building over the coming years.',
    ],
  },
  {
    id: 'data-governance-forum-2026',
    title: 'Data Governance Forum 2026',
    tags: ['NDMO', 'SDAIA'],
    date: '2026-08-15',
    bodyParagraphs: [
      'The Data Governance Forum 2026 convened leaders and practitioners from across the public and private sectors to discuss the evolving landscape of data governance in the Kingdom.',
      'Keynote sessions highlighted progress on the National Data Governance Platform and upcoming enhancements to the regulatory framework.',
    ],
  },
  {
    id: 'international-delegation-visit-to-the-national-office-headquarters',
    title: 'International Delegation Visit to the National Office Headquarters',
    tags: ['NDMO'],
    date: '2026-08-08',
    bodyParagraphs: [
      'An international delegation visited the National Data Management Office headquarters to exchange knowledge on data governance frameworks and regulatory best practices.',
      'The visit included discussions on cross-border data sharing standards and joint capacity-building opportunities.',
    ],
  },
];
