export type ContentType = 'News' | 'Photo' | 'Video';
export type ContentStatus = 'draft' | 'underReview' | 'approved' | 'rejected' | 'published';

export interface ContentItem {
  id: string;
  title: string;
  titleAr?: string;
  type: ContentType;
  status: ContentStatus;
  tags: string[];
  date: string;
  expiryDate?: string;
  bodyParagraphs: string[];
  bodyAr?: string;
  rejectionReason?: string;
  sender: string;
  sentDate: string;
}

export const MEDIA_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'launch-of-the-updated-personal-data-protection-system',
    title: 'Launch of the Updated Personal Data Protection System',
    titleAr: 'إطلاق النسخة المحدثة من نظام حماية البيانات الشخصية',
    type: 'News',
    status: 'published',
    tags: ['PDPL'],
    date: '2026-08-04',
    expiryDate: '2026-12-01',
    bodyParagraphs: [
      'The National Data Management Office (NDMO) announced the rollout of an updated version of the Personal Data Protection System, aimed at strengthening data governance and personal data protection across the Kingdom.',
      'The update introduces clearer guidelines and procedures for entities subject to the Personal Data Protection Law, helping them assess and demonstrate compliance more efficiently.',
    ],
    bodyAr:
      'أعلن المكتب الوطني لإدارة البيانات (NDMO) عن إطلاق نسخة محدثة من نظام حماية البيانات الشخصية، بهدف تعزيز حوكمة البيانات وحماية البيانات الشخصية في جميع أنحاء المملكة. يقدم التحديث إرشادات وإجراءات أوضح للجهات الخاضعة لنظام حماية البيانات الشخصية، مما يساعدها على تقييم امتثالها وإثباته بكفاءة أكبر.',
    sender: 'Fahad Al-Dosari',
    sentDate: '2026-08-01',
  },
  {
    id: 'workshop-on-national-data-governance',
    title: 'Workshop on National Data Governance',
    titleAr: 'ورشة عمل حول إدارة البيانات الوطنية',
    type: 'News',
    status: 'underReview',
    tags: ['NDMO', 'SDAIA'],
    date: '2026-08-10',
    expiryDate: '2026-12-05',
    bodyParagraphs: [
      'SDAIA and the National Data Management Office hosted a joint workshop bringing together representatives from government and private entities to discuss best practices in national data governance.',
      'Sessions covered data classification, sharing frameworks, and the practical steps entities can take to align with the National Data Governance Platform.',
    ],
    bodyAr:
      'استضافت هيئة البيانات والذكاء الاصطناعي والمكتب الوطني لإدارة البيانات ورشة عمل مشتركة جمعت ممثلين من الجهات الحكومية والخاصة لمناقشة أفضل الممارسات في حوكمة البيانات الوطنية. تناولت الجلسات تصنيف البيانات وأطر المشاركة والخطوات العملية التي يمكن للجهات اتخاذها للتوافق مع المنصة الوطنية لحوكمة البيانات.',
    sender: 'Ahmed Al-Mutairi',
    sentDate: '2026-09-01',
  },
  {
    id: 'launch-ceremony-of-the-national-data-strategy',
    title: 'Launch Ceremony of the National Data Strategy',
    titleAr: 'حفل إطلاق الاستراتيجية الوطنية للبيانات',
    type: 'Photo',
    status: 'draft',
    tags: ['NDMO'],
    date: '2026-08-08',
    expiryDate: '2026-12-10',
    bodyParagraphs: [
      'Photo gallery from the official launch ceremony of the National Data Strategy, capturing key moments from the event and the attending delegations.',
    ],
    bodyAr: 'معرض صور من حفل الإطلاق الرسمي للاستراتيجية الوطنية للبيانات، يوثق أبرز لحظات الفعالية والوفود الحاضرة.',
    sender: 'Noura Al-Otaibi',
    sentDate: '2026-08-03',
  },
  {
    id: 'speech-by-the-office-head-at-the-national-data-governance-conference',
    title: 'Speech by the Office Head at the National Data Governance Conference',
    titleAr: 'كلمة رئيس المكتب في مؤتمر حوكمة البيانات الوطنية',
    type: 'Video',
    status: 'rejected',
    tags: ['NDMO'],
    date: '2026-08-05',
    expiryDate: '2026-12-01',
    bodyParagraphs: [
      'Recorded speech by the Office Head at the National Data Governance Conference, covering progress on the National Data Governance Platform and upcoming priorities.',
    ],
    bodyAr:
      'تسجيل لكلمة رئيس المكتب في مؤتمر حوكمة البيانات الوطنية، تناول فيها التقدم المحرز في المنصة الوطنية لحوكمة البيانات والأولويات القادمة.',
    rejectionReason:
      'Incomplete content — please add more details about the topic of the speech and the main points that were covered.',
    sender: 'Khalid Al-Shammari',
    sentDate: '2026-08-28',
  },
  {
    id: 'update-to-digital-governance-policies-and-its-impact-on-cybersecurity',
    title: 'Update to Digital Governance Policies and its Impact on Cybersecurity',
    titleAr: 'تحديث سياسات الحوكمة الرقمية وتأثيرها على الأمن السيبراني',
    type: 'News',
    status: 'approved',
    tags: ['NDMO'],
    date: '2026-08-03',
    expiryDate: '2026-12-01',
    bodyParagraphs: [
      'The National Office for Data Management announced updates to digital governance policies, aligned with international best practices, aimed at strengthening the regulatory framework in the field of cybersecurity.',
      'The updated policies include new standards for assessing security risks and protecting digital infrastructure, and require entities to implement monitoring and encryption mechanisms for data in transit and at rest, in addition to providing clear guidance to help national entities strengthen their capabilities in the field of cybersecurity.',
    ],
    bodyAr:
      'أعلن المكتب الوطني لإدارة البيانات عن تحديثات على سياسات الحوكمة الرقمية، بما يتماشى مع أفضل الممارسات الدولية، بهدف تعزيز الإطار التنظيمي في مجال الأمن السيبراني. تتضمن السياسات المحدثة معايير جديدة لتقييم المخاطر الأمنية وحماية البنية التحتية الرقمية، وتُلزم الجهات بتطبيق آليات للرصد والتشفير للبيانات أثناء النقل والتخزين، إضافة إلى تقديم إرشادات واضحة لدعم الجهات الوطنية في تعزيز قدراتها في مجال الأمن السيبراني.',
    sender: 'Sarah Al-Ghamdi',
    sentDate: '2026-08-25',
  },
  {
    id: 'data-governance-forum-2026',
    title: 'Data Governance Forum 2026',
    titleAr: 'ملتقى حوكمة البيانات ٢٠٢٦',
    type: 'News',
    status: 'published',
    tags: ['NDMO', 'SDAIA'],
    date: '2026-08-15',
    expiryDate: '2026-12-20',
    bodyParagraphs: [
      'The Data Governance Forum 2026 convened leaders and practitioners from across the public and private sectors to discuss the evolving landscape of data governance in the Kingdom.',
      'Keynote sessions highlighted progress on the National Data Governance Platform and upcoming enhancements to the regulatory framework.',
    ],
    bodyAr:
      'جمع ملتقى حوكمة البيانات ٢٠٢٦ قادة وممارسين من القطاعين العام والخاص لمناقشة التطورات في مجال حوكمة البيانات في المملكة. سلطت الجلسات الرئيسية الضوء على التقدم المحرز في المنصة الوطنية لحوكمة البيانات والتحسينات القادمة على الإطار التنظيمي.',
    sender: 'Mohammed Al-Qahtani',
    sentDate: '2026-08-11',
  },
  {
    id: 'international-delegation-visit-to-the-national-office-headquarters',
    title: 'International Delegation Visit to the National Office Headquarters',
    titleAr: 'زيارة وفد دولي لمقر المكتب الوطني',
    type: 'News',
    status: 'underReview',
    tags: ['NDMO'],
    date: '2026-08-08',
    expiryDate: '2026-12-08',
    bodyParagraphs: [
      'An international delegation visited the National Data Management Office headquarters to exchange knowledge on data governance frameworks and regulatory best practices.',
      'The visit included discussions on cross-border data sharing standards and joint capacity-building opportunities.',
    ],
    bodyAr:
      'زار وفد دولي مقر المكتب الوطني لإدارة البيانات لتبادل المعرفة حول أطر حوكمة البيانات وأفضل الممارسات التنظيمية. تضمنت الزيارة مناقشات حول معايير مشاركة البيانات عبر الحدود وفرص بناء القدرات المشتركة.',
    sender: 'Fatimah Al-Harbi',
    sentDate: '2026-09-03',
  },
  {
    id: 'sdaia-annual-data-forum',
    title: 'SDAIA Annual Data Forum',
    titleAr: 'ملتقى هيئة البيانات والذكاء الاصطناعي السنوي للبيانات',
    type: 'Photo',
    status: 'published',
    tags: ['SDAIA', 'NDMO'],
    date: '2026-08-10',
    expiryDate: '2026-12-10',
    bodyParagraphs: ['Photo gallery from the SDAIA Annual Data Forum, featuring sessions, panels, and networking moments from across the event.'],
    bodyAr: 'معرض صور من الملتقى السنوي للبيانات التابع لهيئة البيانات والذكاء الاصطناعي، يوثق الجلسات والحوارات ولحظات التواصل خلال الفعالية.',
    sender: 'Abdullah Al-Zahrani',
    sentDate: '2026-08-06',
  },
  {
    id: 'signing-ceremony-with-international-partners',
    title: 'Signing Ceremony with International Partners',
    titleAr: 'حفل توقيع مع شركاء دوليين',
    type: 'Photo',
    status: 'draft',
    tags: ['SDAIA'],
    date: '2026-08-13',
    expiryDate: '2026-12-13',
    bodyParagraphs: ['Photo gallery from the signing ceremony marking new agreements with international partners on data governance cooperation.'],
    bodyAr: 'معرض صور من حفل التوقيع الذي وثّق اتفاقيات جديدة مع شركاء دوليين في مجال التعاون بشأن حوكمة البيانات.',
    sender: 'Layla Al-Otaibi',
    sentDate: '2026-08-09',
  },
  {
    id: 'explaining-the-personal-data-protection-system',
    title: 'Explaining the Personal Data Protection System',
    titleAr: 'شرح نظام حماية البيانات الشخصية',
    type: 'Video',
    status: 'approved',
    tags: ['PDPL'],
    date: '2026-08-18',
    expiryDate: '2026-12-18',
    bodyParagraphs: ['A short explainer video walking through the key provisions of the Personal Data Protection System and what it means for entities and individuals.'],
    bodyAr: 'فيديو توضيحي قصير يستعرض أبرز أحكام نظام حماية البيانات الشخصية وما تعنيه للجهات والأفراد.',
    sender: 'Turki Al-Anazi',
    sentDate: '2026-08-14',
  },
  {
    id: 'virtual-tour-of-the-national-data-center',
    title: 'Virtual Tour of the National Data Center',
    titleAr: 'جولة افتراضية في مركز البيانات الوطني',
    type: 'Video',
    status: 'published',
    tags: ['NDMO'],
    date: '2026-08-06',
    expiryDate: '2026-12-06',
    bodyParagraphs: ['A virtual tour of the National Data Center, showcasing its infrastructure and role in supporting the National Data Governance Platform.'],
    bodyAr: 'جولة افتراضية في مركز البيانات الوطني، تعرض بنيته التحتية ودوره في دعم المنصة الوطنية لحوكمة البيانات.',
    sender: 'Reem Al-Sulaiman',
    sentDate: '2026-08-02',
  },
  {
    id: 'national-data-center-facility-tour',
    title: 'National Data Center Facility Tour',
    titleAr: 'جولة في منشأة مركز البيانات الوطني',
    type: 'Photo',
    status: 'rejected',
    tags: ['NDMO'],
    date: '2026-08-16',
    expiryDate: '2026-12-16',
    bodyParagraphs: ['Photo gallery from a guided tour of the National Data Center facility.'],
    bodyAr: 'معرض صور من جولة إرشادية في منشأة مركز البيانات الوطني.',
    rejectionReason:
      'Incomplete content — please add more details about the keyword topic and the main points that were covered.',
    sender: 'Fahad Al-Dosari',
    sentDate: '2026-08-20',
  },
];
