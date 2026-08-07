export type Locale = "en" | "zh";
export type TimelinePeriod =
  | "ancient"
  | "classical"
  | "medieval"
  | "living"
  | "layered";

export interface DragonRegion {
  id: string;
  catalogId: string;
  name: string;
  nameZh: string;
  tradition: string;
  traditionZh: string;
  region: string;
  regionZh: string;
  associatedWith: string;
  associatedWithZh: string;
  timelinePeriod: TimelinePeriod;
  timelinePeriodZh: string;
  timelineRangeLabel: string;
  timelineRangeLabelZh: string;
  era: string;
  eraZh: string;
  role: string;
  roleZh: string;
  domains: string[];
  domainsZh: string[];
  traits: string[];
  traitsZh: string[];
  sourceContext: string;
  sourceContextZh: string;
  comparativeNote: string;
  comparativeNoteZh: string;
  description: string;
  descriptionZh: string;
  atmosphere: string;
  atmosphereZh: string;
  mapPosition: { x: number; y: number };
  color: string;
  glowColor: string;
  dragonStyle:
    | "flowing"
    | "serpent"
    | "winged"
    | "feathered"
    | "coiling"
    | "storm"
    | "cosmic";
  image: string;
}

export const dragonRegions: DragonRegion[] = [
  {
    id: "china",
    catalogId: "WDD-EA-001",
    name: "Long",
    nameZh: "龍",
    tradition: "Chinese / East Asian",
    traditionZh: "中國 / 東亞",
    region: "China & East Asia",
    regionZh: "中國與東亞",
    associatedWith: "Rain, rivers, clouds, power, auspicious force",
    associatedWithZh: "雨、水脈、雲氣、權威、祥瑞之力",
    timelinePeriod: "layered",
    timelinePeriodZh: "多時代疊層",
    timelineRangeLabel: "Neolithic origins to living tradition",
    timelineRangeLabelZh: "自新石器時代源頭延續至今的活傳統",
    era: "Neolithic archaeological origins through imperial China into living tradition",
    eraZh: "自新石器時代考古源頭，經帝制中國，延續至今日仍在實踐的活傳統",
    role: "Auspicious regulator of water and cosmic order",
    roleZh: "調節水氣與宇宙秩序的祥瑞之靈",
    domains: ["Rain", "Rivers", "Clouds", "Kingship", "Cosmic harmony"],
    domainsZh: ["降雨", "河流", "雲氣", "王權", "宇宙和諧"],
    traits: ["Serpentine body", "Usually wingless", "Celestial movement", "Weather-linked"],
    traitsZh: ["長蛇形身軀", "通常無翼", "具天象動勢", "與天候相連"],
    sourceContext:
      "Court cosmology, classical texts, ritual symbolism, and later popular folklore",
    sourceContextZh: "宮廷宇宙觀、經典文獻、禮制象徵與後世民間傳說",
    comparativeNote:
      "Unlike the medieval European dragon, Long is usually a life-giving force tied to rain, legitimacy, and balance rather than hoarded treasure or destruction.",
    comparativeNoteZh:
      "相較於中世紀歐洲常被視為災禍或征服對象的巨龍，中國龍更多是與降雨、正統性與天地平衡相連的生機之力。",
    description:
      "A dragon of movement rather than heaviness - serpentine, celestial, and deeply tied to water and sky. Here, the dragon rises with rain, rivers, clouds, and imperial imagination.",
    descriptionZh:
      "這是一種重在流動而非沉重的龍形存在，身軀如蛇，氣息近天，與水域與蒼穹緊密相連。在這片文化想像中，龍隨雨勢、河川、雲氣與帝王象徵一同升起。",
    atmosphere:
      "In East Asia, the dragon rises with rain, rivers, clouds, and imperial imagination.",
    atmosphereZh: "在東亞，龍與雨勢、河川、雲氣以及帝國想像一同升起。",
    mapPosition: { x: 73.8, y: 24.2 },
    color: "#c9a84c",
    glowColor: "rgba(201, 168, 76, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/china-east-asia-long.webp",
  },
  {
    id: "japan",
    catalogId: "WDD-EA-002",
    name: "Ryu",
    nameZh: "龍",
    tradition: "Japanese",
    traditionZh: "日本",
    region: "Japan",
    regionZh: "日本列島",
    associatedWith: "Lakes, storms, mountain spirits, rainfall",
    associatedWithZh: "湖泊、風暴、山靈、降雨",
    timelinePeriod: "layered",
    timelinePeriodZh: "多時代疊層",
    timelineRangeLabel: "Early chronicles to later shrine and folk tradition",
    timelineRangeLabelZh: "自早期編年史延續至後世寺社與民間傳統",
    era: "Early Japanese chronicles through later shrine and folk tradition",
    eraZh: "自日本早期編年史延續至後世寺社與民間傳統",
    role: "Sacred water guardian and storm presence",
    roleZh: "神聖水域的守護者與風暴之靈",
    domains: ["Lakes", "Storms", "Mountains", "Rainfall", "Shrine landscapes"],
    domainsZh: ["湖泊", "風暴", "山岳", "降雨", "神社地景"],
    traits: ["Serpentine form", "Mist-shrouded presence", "Water-bound", "Quietly numinous"],
    traitsZh: ["蛇形身軀", "帶有霧氣感", "棲於水域", "整體氣質幽靜"],
    sourceContext:
      "Mythic chronicles, temple lore, local legends, and mountain-water cults",
    sourceContextZh: "神話編年、寺社傳承、地方傳說與山水信仰",
    comparativeNote:
      "Ryu blends three lineages - indigenous serpent spirits, the Chinese long, and the Buddhist naga invoked for rain - yet it often feels more localized, inhabiting particular lakes, shrines, and mountains rather than embodying a broad imperial cosmology.",
    comparativeNoteZh:
      "日本龍融合了本土蛇靈信仰、中國龍與祈雨的佛教那伽三重來源，但更常與具體的湖泊、神社與山岳相連，而非承載廣域帝國宇宙觀。",
    description:
      "Quieter than its continental cousin, the Japanese dragon lives in mist-shrouded lakes and sacred peaks. It brings rain, guards waterways, and vanishes into mountain air - yet the chronicles also remember Yamata no Orochi, a devouring eight-headed serpent slain by the storm god Susanoo.",
    descriptionZh:
      "相較於大陸上的龍，日本的龍顯得更為靜謐，棲息於霧氣籠罩的湖泊與神聖山巔。它帶來降雨，守護水道，也在山中的潮濕空氣裡隱沒身形——但編年史中也記得八岐大蛇：被風暴之神須佐之男斬殺的吞噬性八頭巨蛇。",
    atmosphere: "In these islands, dragons sleep in lakes, storms, and sacred mountain air.",
    atmosphereZh: "在這些島嶼之上，龍沉眠於湖水、風暴與神聖山氣之中。",
    mapPosition: { x: 83.2, y: 24.6 },
    color: "#7a9bb5",
    glowColor: "rgba(122, 155, 181, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/japan-ryu.webp",
  },
  {
    id: "korea",
    catalogId: "WDD-EA-003",
    name: "Yong / Imugi",
    nameZh: "龍 / 蟒靈",
    tradition: "Korean",
    traditionZh: "韓國",
    region: "Korea",
    regionZh: "朝鮮半島",
    associatedWith: "Transformation, ascension, protection, blessing",
    associatedWithZh: "蛻變、升天、護佑、祝福",
    timelinePeriod: "layered",
    timelinePeriodZh: "多時代疊層",
    timelineRangeLabel: "Medieval chronicles into living yongwang ritual",
    timelineRangeLabelZh: "中世紀史書記載延續至今的龍王信仰",
    era: "Three Kingdoms legends recorded in medieval chronicles (Samguk sagi, Samguk yusa), through Joseon folklore into living yongwang ritual",
    eraZh: "三國時代傳說經中世紀史書（《三國史記》《三國遺事》）記錄，歷朝鮮王朝民俗，延續至今日的龍王信仰儀式",
    role: "Ascending being of blessing, legitimacy, and transformation",
    roleZh: "象徵昇華、庇佑與正統性的蛻變之靈",
    domains: ["Transformation", "Ascent", "Blessing", "Kingship", "Moral cultivation"],
    domainsZh: ["蛻變", "升天", "祝福", "王權", "修行"],
    traits: ["Not always fully formed", "May begin as Imugi", "Associated with ascent", "Protective aura"],
    traitsZh: ["未必天生成熟", "可由蟒靈進化", "與升天相關", "具護佑氣息"],
    sourceContext:
      "Folklore, royal symbolism, didactic storytelling, and regional legend cycles",
    sourceContextZh: "民間傳說、王權象徵、教化故事與地方傳奇系譜",
    comparativeNote:
      "Korean lore gives unusual prominence to the becoming of dragonhood - the imugi's long trial - a motif shared with, but foregrounded beyond, Chinese carp-and-jiao transformation lore.",
    comparativeNoteZh:
      "韓國傳說特別突出「成為龍」的過程——蟒靈的漫長試煉；此母題與中國鯉躍龍門、蛟化為龍相通，但在韓國被推到更核心的位置。",
    description:
      "Some dragon forms here are not born complete - they ascend into legend. The Imugi, a lesser serpent, must endure centuries before earning its place among the heavens.",
    descriptionZh:
      "此地的某些龍形存在並非生而完整，而是在漫長歲月中逐步升入傳說。作為較低階蛇靈的 Imugi，必須歷經漫長修行，才有機會獲得升天之位。",
    atmosphere: "Some dragon forms here are not born complete - they ascend into legend.",
    atmosphereZh: "有些龍並非天生圓滿，而是在歲月裡一步步升入傳說。",
    mapPosition: { x: 79.0, y: 23.4 },
    color: "#9cb88b",
    glowColor: "rgba(156, 184, 139, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/korea-yong-iImugi.webp",
  },
  {
    id: "india",
    catalogId: "WDD-SAS-001",
    name: "Naga",
    nameZh: "那伽",
    tradition: "Hindu / Buddhist",
    traditionZh: "印度教 / 佛教",
    region: "India & South Asia",
    regionZh: "印度與南亞",
    associatedWith: "Rivers, thresholds, sacred memory, protection",
    associatedWithZh: "河流、門檻、神聖記憶、守護",
    timelinePeriod: "layered",
    timelinePeriodZh: "多時代疊層",
    timelineRangeLabel: "Vedic antecedents to living South Asian tradition",
    timelineRangeLabelZh: "自吠陀源頭延續至仍在實踐的南亞傳統",
    era: "Vedic and epic antecedents through Buddhist sources into living South Asian tradition",
    eraZh: "自吠陀與史詩源頭，經佛教文獻，延續至仍在實踐的南亞傳統",
    role: "Threshold guardian between earthly and divine realms",
    roleZh: "連接人界與神界的門檻守護者",
    domains: ["Rivers", "Thresholds", "Wisdom", "Protection", "Underground waters"],
    domainsZh: ["河流", "門檻", "智慧", "守護", "地下水域"],
    traits: ["Coiling body", "Multi-realm presence", "Linked to treasure and fertility", "Often semi-divine"],
    traitsZh: ["盤繞身形", "跨越多重界域", "與寶藏與生育相連", "常具半神性"],
    sourceContext:
      "Epic literature, Buddhist narratives, temple iconography, and ritual cosmology",
    sourceContextZh: "史詩文學、佛教敘事、寺院圖像與儀式宇宙觀",
    comparativeNote:
      "Naga is closer to a sacred serpent lineage than a single dragon species - spanning Hindu, Buddhist, and Jain traditions and radiating into Southeast Asia - standing nearer to divine guardianship than to the knight-versus-dragon model of Europe.",
    comparativeNoteZh:
      "那伽更像一個神聖蛇族系譜，而非單一巨龍物種；其系譜橫跨印度教、佛教與耆那教，並向東南亞輻射。它更接近神聖守護者，而不是歐洲常見的騎士對龍敘事。",
    description:
      "Not all dragons fly. Some coil beneath rivers, thresholds, and sacred memory. The Naga guards water, wisdom, and the boundary between the human and divine worlds.",
    descriptionZh:
      "並非所有龍都在天際飛翔。有些存在盤踞於河流之下、門檻之旁與神聖記憶深處。那伽守護著水、智慧，以及人界與神界之間的邊界。",
    atmosphere: "Not all dragons fly. Some coil beneath rivers, thresholds, and sacred memory.",
    atmosphereZh: "並非所有龍都飛翔；有些盤踞於河流、門檻與神聖記憶之下。",
    mapPosition: { x: 62.2, y: 28.8 },
    color: "#b07aa1",
    glowColor: "rgba(176, 122, 161, 0.3)",
    dragonStyle: "coiling",
    image: "/dragons/india-south-asia-naga.webp",
  },
  {
    id: "mesoamerica",
    catalogId: "WDD-MES-001",
    name: "Quetzalcoatl",
    nameZh: "羽蛇神",
    tradition: "Mesoamerican",
    traditionZh: "中美洲",
    region: "Mesoamerica",
    regionZh: "中美洲",
    associatedWith: "Wind, knowledge, divinity, creation, Venus the morning star",
    associatedWithZh: "風、知識、神性、創造、金星（晨星）",
    timelinePeriod: "classical",
    timelinePeriodZh: "古典時期",
    timelineRangeLabel: "Teotihuacan to the Postclassic Aztec period",
    timelineRangeLabelZh: "自特奧蒂瓦坎延續至後古典期阿茲特克",
    era: "From Preclassic antecedents and Teotihuacan (c. 200 CE) through the Postclassic Aztec period (16th c.)",
    eraZh: "自前古典期雛形與特奧蒂瓦坎（約公元 200 年）延續至後古典期阿茲特克（16 世紀）",
    role: "Creator deity and civilizing force",
    roleZh: "創世神與文明秩序的賜予者",
    domains: ["Wind", "Knowledge", "Creation", "Dawn", "Sacred rulership"],
    domainsZh: ["風", "知識", "創造", "黎明", "神聖統治"],
    traits: ["Feathered serpent", "Divine intelligence", "Sky-earth union", "Associated with learning"],
    traitsZh: ["羽蛇形象", "具神聖智慧", "連結天地", "與學問相關"],
    sourceContext:
      "Temple cultures, codices, ritual statecraft, and mythic cosmogony",
    sourceContextZh: "神廟文化、抄本傳統、祭儀政治與創世神話",
    comparativeNote:
      "Quetzalcoatl differs from many destructive dragon figures because it functions less as a beast and more as an ordering deity tied to wisdom, legitimacy, and creation.",
    comparativeNoteZh:
      "羽蛇神不同於許多偏災厄性的巨龍形象，它較少作為怪物出現，而更像與知識、正統性與創世相關的秩序神祇。",
    description:
      "Here, the serpent wears feathers and carries wind, divinity, and thought. Quetzalcoatl - known to the Maya as Kukulkan - is not merely a beast: it is a god of knowledge, creation, and the dawn.",
    descriptionZh:
      "在這裡，蛇披上羽毛，承載風、神性與思維。羽蛇神——馬雅人稱之為庫庫爾坎——不只是異獸，更是知識、創造與曙光之神。",
    atmosphere: "Here, the serpent wears feathers and carries wind, divinity, and thought.",
    atmosphereZh: "在這裡，蛇披羽而行，帶著風、神性與思想而來。",
    mapPosition: { x: 27.8, y: 32.8 },
    color: "#4db89e",
    glowColor: "rgba(77, 184, 158, 0.3)",
    dragonStyle: "feathered",
    image: "/dragons/mesoamerica-quetzalcoatl-feathered-serpent.webp",
  },
  {
    id: "south-america",
    catalogId: "WDD-SAM-001",
    name: "Boiuna",
    nameZh: "博尤納",
    tradition: "Amazonian",
    traditionZh: "亞馬遜",
    region: "Amazon Basin (Brazilian Amazonia)",
    regionZh: "亞馬遜盆地（以巴西亞馬遜為主）",
    associatedWith: "Rivers, darkness, transformation, floodwaters, fear",
    associatedWithZh: "河流、幽暗、變形、洪水、敬畏",
    timelinePeriod: "living",
    timelinePeriodZh: "延續中的傳統",
    timelineRangeLabel: "Living Amazonian oral tradition",
    timelineRangeLabelZh: "延續中的亞馬遜口傳傳統",
    era: "Amazonian riverine oral tradition with Indigenous (Tupi/Nheengatu) roots, documented since the 19th century",
    eraZh: "具原住民（圖皮／良加圖語）淵源、19 世紀起見於記錄的亞馬遜河岸口傳傳統",
    role: "River power associated with awe, danger, and metamorphosis",
    roleZh: "與敬畏、危險與變形相連的河流力量",
    domains: ["Rivers", "Night water", "Floods", "Transformation", "Hidden force"],
    domainsZh: ["河流", "夜水", "洪水", "變形", "隱伏之力"],
    traits: ["Great black serpent", "Immense scale", "Linked to currents", "Unsettling presence"],
    traitsZh: ["巨大黑蛇", "體量龐大", "與水流相連", "帶有不安氣息"],
    sourceContext:
      "Oral storytelling, river cosmologies, and regional folklore surrounding dangerous waters",
    sourceContextZh: "口述敘事、河流宇宙觀與圍繞危險水域的地方民俗",
    comparativeNote:
      "Boiuna shares with other water serpents a bond to rivers, yet its emphasis falls more heavily on dread, depth, and sudden transformation than on orderly guardianship.",
    comparativeNoteZh:
      "博尤納與其他水蛇一樣緊繫河流，但它更偏向深水、恐懼與突發變形，而非穩定的守護秩序。",
    description:
      "In Amazonian lore, the great black serpent moves through river depth and night water - appearing as ghost ships, boat lights, or human figures, as in the Cobra Norato tales. Boiuna, or Cobra Grande, belongs to the flooded world of channels and currents where the river itself seems alive and watching.",
    descriptionZh:
      "在亞馬遜傳說裡，巨大的黑蛇穿行於深河與夜水之中，會化作幽靈船、船燈或人形，如「Cobra Norato」故事群所述。博尤納，也被稱為 Cobra Grande，屬於那個由水道與急流組成的洪泛世界，彷彿連河流本身都具有意志與目光。",
    atmosphere:
      "In the Amazon, the serpent is felt in black water, flood, and the unseen pull below the surface.",
    atmosphereZh: "在亞馬遜，蛇存在於黑水、洪汛與水面下看不見的牽引之中。",
    mapPosition: { x: 31.2, y: 36.8 },
    color: "#5f8c87",
    glowColor: "rgba(95, 140, 135, 0.3)",
    dragonStyle: "serpent",
    image: "/dragons/south-america-boiuna-cobra-grande.webp",
  },
  {
    id: "north-america",
    catalogId: "WDD-NAM-001",
    name: "Horned Serpent",
    nameZh: "角蛇",
    tradition: "Indigenous North American",
    traditionZh: "北美原住民",
    region: "Eastern Woodlands, Southeast & Plains of North America",
    regionZh: "北美東部林地、東南部與大平原",
    associatedWith: "Lakes, rivers, storms, medicine, sacred danger",
    associatedWithZh: "湖泊、河流、風暴、靈藥、神聖危險",
    timelinePeriod: "living",
    timelinePeriodZh: "延續中的傳統",
    timelineRangeLabel: "Living oral traditions with Mississippian-era roots",
    timelineRangeLabelZh: "延續至今、可上溯密西西比時期的口傳傳統",
    era: "Living oral traditions with Mississippian-era iconographic roots (c. 1200 CE onward)",
    eraZh: "延續至今的口傳傳統，圖像淵源可上溯密西西比時期（約公元 1200 年起）",
    role: "Powerful water-being carrying both danger and sacred medicine",
    roleZh: "兼具危險與靈藥力量的強大水域存在",
    domains: ["Deep waters", "Storms", "Medicine power", "Warning", "Spiritual force"],
    domainsZh: ["深水", "風暴", "醫藥靈力", "警示", "靈性力量"],
    traits: ["Horned serpent", "Water-bound", "Ambivalent power", "Often taboo-laden"],
    traitsZh: ["有角蛇身", "棲於水域", "力量具雙面性", "常伴隨禁忌"],
    sourceContext:
      "Intertribal oral traditions, ceremonial knowledge, and place-based sacred narratives",
    sourceContextZh: "跨部族口傳、儀式知識與深植地景的神聖敘事",
    comparativeNote:
      "The Horned Serpent resembles other sacred water serpents, but its meaning is especially shaped by place, taboo, and relational spiritual knowledge rather than a single canonical myth.",
    comparativeNoteZh:
      "角蛇雖與其他神聖水蛇有相似性，但它更深地受到地方地景、禁忌與關係性靈知所塑造，而非單一經典敘事。",
    description:
      "Across many Indigenous nations of North America, horned serpents belong to powerful waters rather than distant skies - known as Uktena to the Cherokee, Unktehi to the Dakota, and by other names to other nations. These are distinct nation-specific beings, not one shared myth, appearing in rivers, deep lakes, and storm-haunted places where awe, warning, and spiritual force meet.",
    descriptionZh:
      "在許多北美原住民族的傳統中，角蛇不屬於遙遠的天空，而屬於強大的水域——切羅基族稱之為烏克特納，達科塔族稱之為溫克特希，各族各有其名。這些是彼此獨立、屬於各自民族的存在，而非同一個神話。它們現身於河流、深湖與風暴盤旋之地，在那裡，敬畏、警示與靈性力量交會。",
    atmosphere: "In North America, serpent power rises from waters, weather, and sacred caution.",
    atmosphereZh: "在北美，蛇的力量自水域、天候與神聖的警示中升起。",
    mapPosition: { x: 31.5, y: 24.8 },
    color: "#6d9f92",
    glowColor: "rgba(109, 159, 146, 0.3)",
    dragonStyle: "serpent",
    image: "/dragons/indigenous-north-america-horned-serpent.webp",
  },
  {
    id: "europe",
    catalogId: "WDD-EUR-001",
    name: "Dragon",
    nameZh: "巨龍",
    tradition: "European Medieval",
    traditionZh: "歐洲中世紀",
    region: "Western Europe",
    regionZh: "西歐",
    associatedWith: "Fire, treasure, conquest, fear, heroic struggle",
    associatedWithZh: "火焰、財寶、征服、恐懼、英雄試煉",
    timelinePeriod: "medieval",
    timelinePeriodZh: "中世紀",
    timelineRangeLabel: "Medieval Europe, c. 700–1500",
    timelineRangeLabelZh: "中世紀歐洲（約 700–1500 年）",
    era: "Medieval Europe, c. 700–1500, with early medieval epic and older classical and Christian roots",
    eraZh: "中世紀歐洲（約 700–1500 年），含中世紀早期史詩與更早的古典／基督教淵源",
    role: "Adversarial beast in heroic and Christian moral narrative",
    roleZh: "英雄敘事與基督教道德寓言中的敵手之獸",
    domains: ["Fire", "Treasure", "Mountain lairs", "Conquest", "Heroic trial"],
    domainsZh: ["火焰", "寶藏", "山洞巢穴", "征服", "英雄試煉"],
    traits: ["Winged", "Treasure-hoarding", "Monstrous", "Frequently slain by heroes"],
    traitsZh: ["有翼", "囤積寶藏", "怪物化", "常被英雄斬殺"],
    sourceContext: "Saint legends, heroic romance, bestiaries, and courtly epic",
    sourceContextZh: "聖徒傳說、騎士傳奇、動物志與宮廷史詩",
    comparativeNote:
      "Compared with East Asian dragons, the medieval European dragon is much more often cast as an antagonist whose defeat affirms moral, religious, or political order.",
    comparativeNoteZh:
      "相較於東亞龍常與秩序和滋養相連，中世紀歐洲巨龍更常作為反派，其敗亡用來確認道德、宗教或政治秩序。",
    description:
      "In much of Europe, the dragon is a beast to be fought, feared, and sung about. It guards gold in mountain caves and appears in tales of knightly valor and divine confrontation.",
    descriptionZh:
      "在歐洲的大部分地區，龍是必須被對抗、被畏懼、也被吟唱的猛獸。它守著山洞中的金銀財寶，也出現在騎士英勇與神聖對決的故事裡。",
    atmosphere: "In much of Europe, the dragon is a beast to be fought, feared, and sung about.",
    atmosphereZh: "在歐洲大地，龍往往是被征戰、被畏懼，也被歌唱的巨獸。",
    mapPosition: { x: 49.7, y: 23.9 },
    color: "#c45c3e",
    glowColor: "rgba(196, 92, 62, 0.3)",
    dragonStyle: "winged",
    image: "/dragons/europe-medieval-dragon.webp",
  },
  {
    id: "norse",
    catalogId: "WDD-NOR-001",
    name: "Jormungandr",
    nameZh: "約爾蒙岡德",
    tradition: "Norse",
    traditionZh: "北歐",
    region: "North Atlantic & Scandinavia",
    regionZh: "北大西洋與斯堪地那維亞",
    associatedWith: "Sea, fate, encirclement, storms, Ragnarok",
    associatedWithZh: "海洋、命運、環繞、風暴、諸神黃昏",
    timelinePeriod: "medieval",
    timelinePeriodZh: "中世紀",
    timelineRangeLabel: "Viking Age myth recorded in medieval Iceland",
    timelineRangeLabelZh: "維京時代神話・中世紀冰島成文",
    era: "Viking Age oral myth (c. 800–1100), recorded in 13th-century Iceland",
    eraZh: "維京時代口傳神話（約 800–1100 年），13 世紀於冰島成文",
    role: "Cosmic serpent marking the scale of doom and world order",
    roleZh: "標示末日與世界尺度的宇宙巨蛇",
    domains: ["Sea", "Fate", "Storm", "World-boundary", "Ragnarok"],
    domainsZh: ["海洋", "命運", "風暴", "世界邊界", "諸神黃昏"],
    traits: ["World-encircling", "Sea serpent", "Cosmic scale", "Apocalyptic association"],
    traitsZh: ["環繞世界", "海蛇形態", "具宇宙尺度", "與末日相關"],
    sourceContext: "Eddic poetry, skaldic tradition, and Norse cosmological myth",
    sourceContextZh: "艾達詩歌、史卡爾德傳統與北歐宇宙神話",
    comparativeNote:
      "Jormungandr is less a local monster than a world-structure: unlike many dragons bound to one mountain or river, it defines the edge of the cosmos itself.",
    comparativeNoteZh:
      "約爾蒙岡德不像地方性的怪物，而更像世界結構本身；不同於被綁定於山洞或河流的龍，它界定的是宇宙邊界。",
    description:
      "In Norse myth, the world-serpent does not merely haunt the ocean - it measures it. Jormungandr coils through the northern sea as a sign of cosmic scale, bound to storm, doom, and the final breaking of the world.",
    descriptionZh:
      "在北歐神話裡，世界巨蛇不只是在海中出沒，更像是衡量海洋尺度的存在。約爾蒙岡德盤繞北海，象徵宇宙性的巨大規模，與風暴、末日與世界的最終崩裂相連。",
    atmosphere: "In the northern waters, the serpent circles the edge of fate itself.",
    atmosphereZh: "在北方海域，巨蛇盤繞著命運本身的邊界。",
    mapPosition: { x: 43.8, y: 19.8 },
    color: "#93a7a0",
    glowColor: "rgba(147, 167, 160, 0.28)",
    dragonStyle: "storm",
    image: "/dragons/norse-north-atlantic-jormungandr.webp",
  },
  {
    id: "slavic",
    catalogId: "WDD-SLV-001",
    name: "Zmey",
    nameZh: "茲梅伊",
    tradition: "Slavic / Eastern European",
    traditionZh: "斯拉夫 / 東歐",
    region: "Eastern Europe",
    regionZh: "東歐",
    associatedWith: "Fire, abduction, heroic combat, storms, swamps, folklore",
    associatedWithZh: "火焰、擄掠、勇士對決、風暴、沼澤、民間傳說",
    timelinePeriod: "medieval",
    timelinePeriodZh: "中世紀",
    timelineRangeLabel: "Kievan-cycle roots, recorded 18th–19th c.",
    timelineRangeLabelZh: "基輔史詩淵源・18–19 世紀採錄",
    era: "Medieval Kievan-cycle roots, recorded in 18th–19th-century bylina collections",
    eraZh: "源於中世紀基輔史詩傳統，18–19 世紀始有系統採錄",
    role: "Folkloric storm-dragon embodying untamed elemental threat",
    roleZh: "象徵失控自然威脅的民俗風暴龍",
    domains: ["Storm", "Swamp", "Forest edge", "Elemental fear", "Shape-shifting"],
    domainsZh: ["風暴", "沼澤", "森林邊界", "元素性恐懼", "變形"],
    traits: ["Sometimes multi-headed", "Shape-shifting", "Folkloric", "Linked to wild terrain"],
    traitsZh: ["有時多頭", "會變形", "強烈民俗性", "與荒野地景相連"],
    sourceContext: "Village folklore, oral tales, heroic cycles, and regional demonology",
    sourceContextZh: "村落民俗、口述故事、英雄循環與地方妖異想像",
    comparativeNote:
      "Zmey overlaps with the European dragon but splits by region: in East Slavic byliny it is the fire-breathing, abducting adversary slain by bogatyrs, while in South Slavic folklore the zmey is often a protective weather-being defending fields against hail demons.",
    comparativeNoteZh:
      "茲梅伊與歐洲巨龍有重疊處，但存在地區差異：東斯拉夫壯士歌中是噴火、擄人、由勇士斬殺的敵手；南斯拉夫民俗中的 zmey 則常是對抗冰雹妖的護村天候精怪。",
    description:
      "These dragons do not always dwell in castles. In the byliny, Zmey Gorynych is a fire-breathing, multi-headed abductor slain by bogatyrs like Dobrynya Nikitich; elsewhere it belongs to storm, swamp, and folktale fear, embodying nature's unpredictable wrath.",
    descriptionZh:
      "這些龍並不總是棲身於城堡之中。在壯士歌裡，茲梅伊・戈里尼奇是噴火、多頭、擄人的怪物，由多布里尼亞等勇士斬殺；在其他敘事中，牠們屬於風暴、沼澤與民間故事裡的原始恐懼，象徵自然難以預測的暴烈面貌。",
    atmosphere:
      "These dragons do not always dwell in castles. Some belong to storm, swamp, and folktale fear.",
    atmosphereZh: "這些龍不總住在城堡裡，有些屬於風暴、沼澤與民間故事裡的恐懼。",
    mapPosition: { x: 56.8, y: 20.8 },
    color: "#6b8f71",
    glowColor: "rgba(107, 143, 113, 0.3)",
    dragonStyle: "storm",
    image: "/dragons/slavic-eastern-europe-zmey-storm-serpent-variant.webp",
  },
  {
    id: "egypt",
    catalogId: "WDD-EGY-001",
    name: "Apep",
    nameZh: "阿佩普",
    tradition: "Egyptian",
    traditionZh: "埃及",
    region: "Egypt & North Africa",
    regionZh: "埃及與北非",
    associatedWith: "Night, eclipse, chaos, the underworld, cosmic threat",
    associatedWithZh: "黑夜、蝕象、混沌、冥界、宇宙威脅",
    timelinePeriod: "ancient",
    timelinePeriodZh: "古代",
    timelineRangeLabel: "Middle Kingdom to Ptolemaic ritual texts",
    timelineRangeLabelZh: "中王國至托勒密時期祭儀文獻",
    era: "Attested from the Middle Kingdom through Ptolemaic ritual texts (c. 2000–300 BCE)",
    eraZh: "自中王國時期延續至托勒密時期祭儀文獻（約公元前 2000 至前 300 年）",
    role: "Embodiment of chaos opposing the solar order",
    roleZh: "對抗太陽秩序的混沌化身",
    domains: ["Night", "Chaos", "Underworld", "Solar peril", "Cosmic opposition"],
    domainsZh: ["黑夜", "混沌", "冥界", "太陽危機", "宇宙對抗"],
    traits: ["Gigantic serpent", "Nightly adversary", "Not a guardian", "Devouring darkness"],
    traitsZh: ["巨型蛇身", "每夜對抗太陽", "並非守護者", "吞噬性的黑暗"],
    sourceContext:
      "Funerary texts, temple cosmology, solar theology, and ritual recitation",
    sourceContextZh: "墓葬文書、神殿宇宙觀、太陽神學與祭儀誦念",
    comparativeNote:
      "Unlike protective water serpents or auspicious dragons, Apep is an anti-order being: it stands as a recurring cosmic threat rather than a local guardian or civilizing force.",
    comparativeNoteZh:
      "不同於守護性的水蛇或祥瑞之龍，阿佩普是反秩序的存在；它不是地方守護者，也不是文明力量，而是反覆歸來的宇宙威脅。",
    description:
      "Apep - known to the Greeks as Apophis - is not a guardian dragon but a force of devouring darkness. In Egyptian cosmology, it rises each night against the solar journey of Ra, a vast serpent of chaos that must be resisted again and again.",
    descriptionZh:
      "阿佩普——希臘人稱之為阿波菲斯——並非守護型的龍蛇，而是吞噬一切的黑暗之力。在埃及宇宙觀中，它每夜都起身對抗拉神的太陽航程，是必須一再被抵禦的混沌巨蛇。",
    atmosphere: "In Egypt, the serpent waits in the dark beyond the sun's passage.",
    atmosphereZh: "在埃及，巨蛇潛伏於太陽行經之後的黑暗深處。",
    mapPosition: { x: 54.5, y: 28.2 },
    color: "#d1b07a",
    glowColor: "rgba(209, 176, 122, 0.3)",
    dragonStyle: "cosmic",
    image: "/dragons/egypt-north-africa-apep.webp",
  },
  {
    id: "persia",
    catalogId: "WDD-PER-001",
    name: "Aži Dahāka",
    nameZh: "阿基・達哈卡",
    tradition: "Persian / Middle Eastern",
    traditionZh: "波斯 / 中東",
    region: "Middle East & Persia",
    regionZh: "中東與波斯",
    associatedWith: "Cosmic struggle, deserts, eclipses, ancient kings",
    associatedWithZh: "宇宙對抗、沙漠、蝕象、古代王權",
    timelinePeriod: "layered",
    timelinePeriodZh: "多時代疊層",
    timelineRangeLabel: "Avestan roots to later Persian epic tradition",
    timelineRangeLabelZh: "自《阿維斯陀》根源延續至後世波斯史詩傳統",
    era: "Avestan and later Persian epic tradition",
    eraZh: "《阿維斯陀》與後世波斯史詩傳統",
    role: "Chaos-dragon opposed by heroes, rulers, and divine order",
    roleZh: "由英雄、王權與神聖秩序對抗的混沌之龍",
    domains: ["Desert", "Stars", "Kingship", "Cosmic struggle", "Heroic confrontation"],
    domainsZh: ["沙漠", "星辰", "王權", "宇宙對抗", "英雄征戰"],
    traits: ["Three-headed, six-eyed (Avestan)", "Massive dragon-serpent", "Chaotic force", "Epic scale"],
    traitsZh: ["三頭六眼（《阿維斯陀》所載）", "龐大的龍蛇形體", "混沌力量", "史詩尺度"],
    sourceContext: "Epic tradition, royal myth, cosmological dualism, and heroic legend",
    sourceContextZh: "史詩傳統、王權神話、二元宇宙論與英雄傳奇",
    comparativeNote:
      "Aži Dahāka - later the generic Persian azhdaha - is closer to Apep or the European adversarial dragon than to East Asian rain dragons, but its frame is often more explicitly cosmic and royal than purely monstrous.",
    comparativeNoteZh:
      "阿基・達哈卡（後世通稱阿茲達哈）比起東亞雨龍，更接近阿佩普或歐洲敵對型巨龍；但它的敘事框架往往更明確地連向宇宙對抗與王權秩序，而不只是怪物性。",
    description:
      "Some dragon forms emerge where myth speaks in deserts, kings, and cosmic struggle. In the Avesta the three-headed Aži Dahāka is overcome by the hero Thraētaona; in the Shahnameh it becomes the serpent-shouldered tyrant Zahhāk, bound beneath Mount Damāvand - primordial chaos that heroes and empires must overcome.",
    descriptionZh:
      "有些龍的形象誕生於沙漠、王權與宇宙對抗交織的神話之中。在《阿維斯陀》裡，三頭巨龍阿基・達哈卡被英雄特拉埃塔奧納制伏；在《列王紀》中，它化為雙肩生蛇的暴君查哈克，被縛於達馬萬德山下——那是英雄與帝國都必須跨越的原初混沌。",
    atmosphere:
      "Some dragon forms emerge where myth speaks in stars, deserts, kings, and cosmic struggle.",
    atmosphereZh: "有些龍誕生於星辰、沙漠、王權與宇宙對抗交織的神話語言之中。",
    mapPosition: { x: 59.6, y: 25.8 },
    color: "#d4a574",
    glowColor: "rgba(212, 165, 116, 0.3)",
    dragonStyle: "cosmic",
    image: "/dragons/middle-east-persia-cosmic-serpent-chaos-dragon.webp",
  },
  {
    id: "australia",
    catalogId: "WDD-AUS-001",
    name: "Rainbow Serpent",
    nameZh: "彩虹蛇",
    tradition: "Aboriginal Australian",
    traditionZh: "澳洲原住民",
    region: "Australia",
    regionZh: "澳洲",
    associatedWith: "Creation, rain, waterways, ancestral law, renewal",
    associatedWithZh: "創世、降雨、水道、祖靈法則、更新",
    timelinePeriod: "living",
    timelinePeriodZh: "延續中的傳統",
    timelineRangeLabel: "Living Dreaming traditions",
    timelineRangeLabelZh: "延續中的創世祖靈傳統",
    era: "Aboriginal Dreaming traditions",
    eraZh: "澳洲原住民創世祖靈傳統",
    role: "Ancestral creator and law-bearing serpent",
    roleZh: "攜帶祖靈法則的創世之蛇",
    domains: ["Creation", "Rain", "Waterways", "Ancestral law", "Renewal"],
    domainsZh: ["創世", "降雨", "水道", "祖靈法則", "更新"],
    traits: ["Serpentine creator", "Landscape-shaping", "Ancestral presence", "Life-giving and dangerous"],
    traitsZh: ["蛇形創世者", "塑造地景", "具祖靈臨在", "兼具生命與危險"],
    sourceContext:
      "Country-based oral tradition, ceremonial knowledge, and Dreaming cosmology",
    sourceContextZh: "根植於土地的口傳、儀式知識與創世祖靈宇宙觀",
    comparativeNote:
      "The Rainbow Serpent differs sharply from adversarial dragons because it is tied to origin, law, and land formation; it is a foundational being, not simply a creature to fear.",
    comparativeNoteZh:
      "彩虹蛇與敵對型巨龍差異極大，因為它與起源、法則與地景生成相連；它是奠基性的祖靈存在，而不只是令人恐懼的生物。",
    description:
      "Across many Aboriginal Australian traditions, the Rainbow Serpent is a being of origin, movement, and living law. \"Rainbow Serpent\" is an English collective label for related but distinct ancestral beings - Ngalyod to the Kunwinjku, Wagyl to the Noongar, Ngatyi to the Barkandji - who shape waterways, carry rain, and mark the land as formed by ancestral presence rather than empty ground.",
    descriptionZh:
      "在許多澳洲原住民族傳統中，彩虹蛇是關於起源、流動與活的法則的存在。「彩虹蛇」是英文的統稱標籤，各民族對這些相關但各自獨立的祖靈存在有自己的名稱——昆溫庫族稱 Ngalyod、努恩加族稱 Wagyl、巴坎吉族稱 Ngatyi。它們塑造水道，攜帶降雨，也使大地成為祖靈存在所形成之地，而不是一片空白土地。",
    atmosphere: "In Australia, the serpent moves through rain, earth, and the deep memory of creation.",
    atmosphereZh: "在澳洲，蛇穿行於雨、土地與創世的深層記憶之中。",
    mapPosition: { x: 77.4, y: 40.5 },
    color: "#cba177",
    glowColor: "rgba(203, 161, 119, 0.28)",
    dragonStyle: "flowing",
    image: "/dragons/australia-rainbow-serpent.webp",
  },
  {
    id: "polynesia",
    catalogId: "WDD-POL-001",
    name: "Taniwha",
    nameZh: "塔尼法",
    tradition: "Māori (Aotearoa New Zealand)",
    traditionZh: "毛利（紐西蘭奧特亞羅瓦）",
    region: "Aotearoa New Zealand & the South Pacific",
    regionZh: "紐西蘭奧特亞羅瓦與南太平洋",
    associatedWith: "Sea routes, estuaries, guardianship, warning, ancestral power",
    associatedWithZh: "海路、河口、守護、警示、祖靈之力",
    timelinePeriod: "living",
    timelinePeriodZh: "延續中的傳統",
    timelineRangeLabel: "Living Māori tradition",
    timelineRangeLabelZh: "延續中的毛利傳統",
    era: "Living Māori ancestral tradition, with wider Polynesian cognates",
    eraZh: "延續中的毛利祖靈傳統，玻里尼西亞其他地區有同源詞",
    role: "Guardian-being of channels, estuaries, and dangerous thresholds",
    roleZh: "守護水道、河口與危險門檻的存在",
    domains: ["Sea routes", "Estuaries", "Guardianship", "Warning", "Ancestral waters"],
    domainsZh: ["海路", "河口", "守護", "警示", "祖靈之水"],
    traits: ["Great water-being", "Threshold guardian", "Ambivalent protector", "Linked to surf and tidal places"],
    traitsZh: ["巨大的水中存在", "門檻守護者", "帶雙面性的保護者", "與潮汐與浪區相連"],
    sourceContext:
      "Genealogical tradition, oral narrative, tribal place memory, and coastal lore",
    sourceContextZh: "家族系譜傳統、口述敘事、部族地景記憶與海岸民俗",
    comparativeNote:
      "Taniwha shares with other water serpents a closeness to danger, but it is especially defined by guardianship of passageways and by deep ancestral ties to specific places.",
    comparativeNoteZh:
      "塔尼法與其他水蛇一樣貼近危險，但它特別強調對通道與邊界的守護，以及與特定地點深厚的祖靈連結。",
    description:
      "In Māori tradition, the great water-being is not only feared but respected as a guardian of channels, coasts, and thresholds. Taniwha take many forms - shark, whale, lizard, even a drifting log - and are still invoked today as kaitiaki (guardians) in decisions about rivers, coasts, and land.",
    descriptionZh:
      "在毛利傳統中，這種巨大的水中存在不僅令人敬畏，也被尊為水道、海岸與門檻之地的守護者。塔尼法有多種形貌——鯊魚、鯨、蜥蜴，甚至流木——至今仍以守護者（kaitiaki）身分，出現在河川、海岸與土地相關的當代決策討論中。",
    atmosphere: "Across the South Pacific, water guardians move through surf, reefs, and ancestral waters in many forms.",
    atmosphereZh: "在南太平洋，水中守護者以多種形貌穿行於浪頭、礁岸與祖靈之水之間。",
    mapPosition: { x: 84.0, y: 46.0 },
    color: "#7fb7b9",
    glowColor: "rgba(127, 183, 185, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/polynesia-pacific-oceanic-serpent-sea-guardian.webp",
  },
];

export const timelinePeriods: Array<{
  id: TimelinePeriod | "all";
  label: string;
  labelZh: string;
  note: string;
  noteZh: string;
}> = [
  {
    id: "all",
    label: "All eras",
    labelZh: "全時期",
    note: "View the atlas without time filtering",
    noteZh: "不套用時間篩選，查看整張地圖",
  },
  {
    id: "ancient",
    label: "Ancient",
    labelZh: "古代",
    note: "Cosmologies rooted in ancient ritual worlds",
    noteZh: "根植於古代祭儀與宇宙觀的神話",
  },
  {
    id: "classical",
    label: "Classical",
    labelZh: "古典時期",
    note: "Civilizational dragon forms refined through temple and court cultures",
    noteZh: "在神廟與宮廷文化中成熟的文明龍形",
  },
  {
    id: "medieval",
    label: "Medieval",
    labelZh: "中世紀",
    note: "Dragons shaped by heroic, courtly, and regional legend cycles",
    noteZh: "由英雄敘事、宮廷文化與地方傳奇塑形的龍",
  },
  {
    id: "living",
    label: "Living tradition",
    labelZh: "延續中的傳統",
    note: "Traditions that remain active in cultural memory and community practice",
    noteZh: "仍活在文化記憶與社群實踐中的傳統",
  },
  {
    id: "layered",
    label: "Layered time",
    labelZh: "多時代疊層",
    note: "Figures that span multiple eras and cannot be reduced to one period",
    noteZh: "跨越多重時代、難以被壓縮為單一時期的形象",
  },
];
