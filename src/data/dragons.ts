export type Locale = "en" | "zh";

export interface DragonRegion {
  id: string;
  name: string;
  nameZh: string;
  tradition: string;
  traditionZh: string;
  region: string;
  regionZh: string;
  associatedWith: string;
  associatedWithZh: string;
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
    name: "Long",
    nameZh: "龍",
    tradition: "Chinese / East Asian",
    traditionZh: "中國 / 東亞",
    region: "China & East Asia",
    regionZh: "中國與東亞",
    associatedWith: "Rain, rivers, clouds, power, auspicious force",
    associatedWithZh: "雨、水脈、雲氣、權威、祥瑞之力",
    era: "Pre-imperial to imperial China",
    eraZh: "先秦至帝制中國",
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
    name: "Ryu",
    nameZh: "龍",
    tradition: "Japanese",
    traditionZh: "日本",
    region: "Japan",
    regionZh: "日本列島",
    associatedWith: "Lakes, storms, mountain spirits, rainfall",
    associatedWithZh: "湖泊、風暴、山靈、降雨",
    era: "Classical to medieval Japan",
    eraZh: "日本古典至中世時期",
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
      "Ryu resembles continental East Asian dragons, yet it often feels more localized, inhabiting particular lakes, shrines, and mountains rather than embodying a broad imperial cosmology.",
    comparativeNoteZh:
      "日本龍與東亞大陸龍有親緣性，但更常與具體的湖泊、神社與山岳相連，而非承載廣域帝國宇宙觀。",
    description:
      "Quieter than its continental cousin, the Japanese dragon lives in mist-shrouded lakes and sacred peaks. It brings rain, guards waterways, and vanishes into mountain air.",
    descriptionZh:
      "相較於大陸上的龍，日本的龍顯得更為靜謐，棲息於霧氣籠罩的湖泊與神聖山巔。它帶來降雨，守護水道，也在山中的潮濕空氣裡隱沒身形。",
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
    name: "Yong / Imugi",
    nameZh: "龍 / 蟒靈",
    tradition: "Korean",
    traditionZh: "韓國",
    region: "Korea",
    regionZh: "朝鮮半島",
    associatedWith: "Transformation, ascension, protection, blessing",
    associatedWithZh: "蛻變、升天、護佑、祝福",
    era: "Pre-modern Korean folklore and court culture",
    eraZh: "前近代韓國民俗與宮廷文化",
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
      "The Korean dragon is especially marked by transformation: where other traditions begin with a complete dragon, Korean lore often emphasizes the becoming of dragonhood.",
    comparativeNoteZh:
      "韓國龍最特別之處在於「成為龍」的過程；許多其他文化直接給出完成形態，韓國傳說則更強調漫長蛻變與昇格。",
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
    name: "Naga",
    nameZh: "那伽",
    tradition: "Hindu / Buddhist",
    traditionZh: "印度教 / 佛教",
    region: "India & South Asia",
    regionZh: "印度與南亞",
    associatedWith: "Rivers, thresholds, sacred memory, protection",
    associatedWithZh: "河流、門檻、神聖記憶、守護",
    era: "Ancient to early medieval South Asia",
    eraZh: "古代至中世初期南亞",
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
      "Naga is closer to a sacred serpent lineage than a single dragon species, standing nearer to divine guardianship than to the knight-versus-dragon model of Europe.",
    comparativeNoteZh:
      "那伽更像一個神聖蛇族系譜，而非單一巨龍物種；它更接近神聖守護者，而不是歐洲常見的騎士對龍敘事。",
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
    name: "Quetzalcoatl",
    nameZh: "羽蛇神",
    tradition: "Mesoamerican",
    traditionZh: "中美洲",
    region: "Mesoamerica",
    regionZh: "中美洲",
    associatedWith: "Wind, knowledge, divinity, creation",
    associatedWithZh: "風、知識、神性、創造",
    era: "Classical and postclassic Mesoamerica",
    eraZh: "中美洲古典期與後古典期",
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
      "Here, the serpent wears feathers and carries wind, divinity, and thought. Quetzalcoatl is not merely a beast - it is a god of knowledge, creation, and the dawn.",
    descriptionZh:
      "在這裡，蛇披上羽毛，承載風、神性與思維。羽蛇神不只是異獸，更是知識、創造與曙光之神。",
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
    name: "Boiuna",
    nameZh: "博尤納",
    tradition: "Amazonian / South American",
    traditionZh: "亞馬遜 / 南美",
    region: "Amazon Basin & South America",
    regionZh: "亞馬遜盆地與南美洲",
    associatedWith: "Rivers, darkness, transformation, floodwaters, fear",
    associatedWithZh: "河流、幽暗、變形、洪水、敬畏",
    era: "Amazonian oral tradition across precolonial and later folklore",
    eraZh: "前殖民至後世亞馬遜口傳傳統",
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
      "In Amazonian lore, the great black serpent moves through river depth, night water, and sudden transformation. Boiuna, or Cobra Grande, belongs to the flooded world of channels and currents where the river itself seems alive and watching.",
    descriptionZh:
      "在亞馬遜傳說裡，巨大的黑蛇穿行於深河、夜水與突如其來的變形之中。博尤納，也被稱為 Cobra Grande，屬於那個由水道與急流組成的洪泛世界，彷彿連河流本身都具有意志與目光。",
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
    name: "Horned Serpent",
    nameZh: "角蛇",
    tradition: "Indigenous North American",
    traditionZh: "北美原住民",
    region: "North America",
    regionZh: "北美洲",
    associatedWith: "Lakes, rivers, storms, medicine, sacred danger",
    associatedWithZh: "湖泊、河流、風暴、靈藥、神聖危險",
    era: "Indigenous oral traditions across North America",
    eraZh: "北美原住民跨部族口傳傳統",
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
      "Across many Indigenous traditions of North America, the horned serpent belongs to powerful waters rather than distant skies. It appears in rivers, deep lakes, and storm-haunted places where awe, warning, and spiritual force meet.",
    descriptionZh:
      "在許多北美原住民族傳統中，角蛇不屬於遙遠的天空，而屬於強大的水域。它現身於河流、深湖與風暴盤旋之地，在那裡，敬畏、警示與靈性力量交會。",
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
    name: "Dragon",
    nameZh: "巨龍",
    tradition: "European Medieval",
    traditionZh: "歐洲中世紀",
    region: "Western Europe",
    regionZh: "西歐",
    associatedWith: "Fire, treasure, conquest, fear, heroic struggle",
    associatedWithZh: "火焰、財寶、征服、恐懼、英雄試煉",
    era: "Medieval Europe",
    eraZh: "中世紀歐洲",
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
    name: "Jormungandr",
    nameZh: "約爾蒙岡德",
    tradition: "Norse",
    traditionZh: "北歐",
    region: "North Atlantic & Scandinavia",
    regionZh: "北大西洋與斯堪地那維亞",
    associatedWith: "Sea, fate, encirclement, storms, Ragnarok",
    associatedWithZh: "海洋、命運、環繞、風暴、諸神黃昏",
    era: "Old Norse mythic imagination",
    eraZh: "古北歐神話傳統",
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
    name: "Zmey",
    nameZh: "茲梅伊",
    tradition: "Slavic / Eastern European",
    traditionZh: "斯拉夫 / 東歐",
    region: "Eastern Europe",
    regionZh: "東歐",
    associatedWith: "Storms, swamps, forests, folklore, elemental fear",
    associatedWithZh: "風暴、沼澤、森林、民間傳說、元素性的恐懼",
    era: "Slavic folklore and medieval vernacular legend",
    eraZh: "斯拉夫民俗與中世紀地方傳說",
    role: "Folkloric storm-dragon embodying untamed elemental threat",
    roleZh: "象徵失控自然威脅的民俗風暴龍",
    domains: ["Storm", "Swamp", "Forest edge", "Elemental fear", "Shape-shifting"],
    domainsZh: ["風暴", "沼澤", "森林邊界", "元素性恐懼", "變形"],
    traits: ["Sometimes multi-headed", "Shape-shifting", "Folkloric", "Linked to wild terrain"],
    traitsZh: ["有時多頭", "會變形", "強烈民俗性", "與荒野地景相連"],
    sourceContext: "Village folklore, oral tales, heroic cycles, and regional demonology",
    sourceContextZh: "村落民俗、口述故事、英雄循環與地方妖異想像",
    comparativeNote:
      "Zmey overlaps with the European dragon, but it is often more fluid, more folkloric, and more deeply embedded in storm, marsh, and village imagination.",
    comparativeNoteZh:
      "茲梅伊與歐洲巨龍有重疊處，但它往往更流動、更民俗，也更深地紮根於風暴、濕地與村落想像。",
    description:
      "These dragons do not always dwell in castles. Some belong to storm, swamp, and folktale fear. Multi-headed and shape-shifting, they embody nature's unpredictable wrath.",
    descriptionZh:
      "這些龍並不總是棲身於城堡之中。有些屬於風暴、沼澤與民間故事裡的原始恐懼。牠們多頭、善變，象徵自然難以預測的暴烈面貌。",
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
    name: "Apep",
    nameZh: "阿佩普",
    tradition: "Egyptian",
    traditionZh: "埃及",
    region: "Egypt & North Africa",
    regionZh: "埃及與北非",
    associatedWith: "Night, eclipse, chaos, the underworld, cosmic threat",
    associatedWithZh: "黑夜、蝕象、混沌、冥界、宇宙威脅",
    era: "Ancient Egyptian cosmology",
    eraZh: "古埃及宇宙觀",
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
      "Apep is not a guardian dragon but a force of devouring darkness. In Egyptian cosmology, it rises each night against the solar journey of Ra, a vast serpent of chaos that must be resisted again and again.",
    descriptionZh:
      "阿佩普並非守護型的龍蛇，而是吞噬一切的黑暗之力。在埃及宇宙觀中，它每夜都起身對抗拉神的太陽航程，是必須一再被抵禦的混沌巨蛇。",
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
    name: "Azhdaha",
    nameZh: "阿茲達哈",
    tradition: "Persian / Middle Eastern",
    traditionZh: "波斯 / 中東",
    region: "Middle East & Persia",
    regionZh: "中東與波斯",
    associatedWith: "Cosmic struggle, deserts, stars, ancient kings",
    associatedWithZh: "宇宙對抗、沙漠、星辰、古代王權",
    era: "Ancient Persian and wider Middle Eastern mythic traditions",
    eraZh: "古波斯與更廣義中東神話傳統",
    role: "Chaos-dragon opposed by heroes, rulers, and divine order",
    roleZh: "由英雄、王權與神聖秩序對抗的混沌之龍",
    domains: ["Desert", "Stars", "Kingship", "Cosmic struggle", "Heroic confrontation"],
    domainsZh: ["沙漠", "星辰", "王權", "宇宙對抗", "英雄征戰"],
    traits: ["Massive dragon-serpent", "Chaotic force", "Epic scale", "Tied to primal disorder"],
    traitsZh: ["龐大的龍蛇形體", "混沌力量", "史詩尺度", "與原初失序相連"],
    sourceContext: "Epic tradition, royal myth, cosmological dualism, and heroic legend",
    sourceContextZh: "史詩傳統、王權神話、二元宇宙論與英雄傳奇",
    comparativeNote:
      "Azhdaha is closer to Apep or the European adversarial dragon than to East Asian rain dragons, but its frame is often more explicitly cosmic and royal than purely monstrous.",
    comparativeNoteZh:
      "阿茲達哈比起東亞雨龍，更接近阿佩普或歐洲敵對型巨龍；但它的敘事框架往往更明確地連向宇宙對抗與王權秩序，而不只是怪物性。",
    description:
      "Some dragon forms emerge where myth speaks in stars, deserts, kings, and cosmic struggle. The Azhdaha embodies primordial chaos - a force that heroes and empires must overcome.",
    descriptionZh:
      "有些龍的形象誕生於星辰、沙漠、王權與宇宙對抗交織的神話之中。阿茲達哈象徵原初混沌，是英雄與帝國都必須跨越的力量。",
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
    name: "Rainbow Serpent",
    nameZh: "彩虹蛇",
    tradition: "Aboriginal Australian",
    traditionZh: "澳洲原住民",
    region: "Australia",
    regionZh: "澳洲",
    associatedWith: "Creation, rain, waterways, ancestral law, renewal",
    associatedWithZh: "創世、降雨、水道、祖靈法則、更新",
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
      "Across many Aboriginal Australian traditions, the Rainbow Serpent is a being of origin, movement, and living law. It shapes waterways, carries rain, and marks the land as a place formed by ancestral presence rather than empty ground.",
    descriptionZh:
      "在許多澳洲原住民族傳統中，彩虹蛇是關於起源、流動與活的法則的存在。它塑造水道，攜帶降雨，也使大地成為祖靈存在所形成之地，而不是一片空白土地。",
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
    name: "Taniwha",
    nameZh: "塔尼法",
    tradition: "Polynesian / Maori",
    traditionZh: "玻里尼西亞 / 毛利",
    region: "South Pacific & Aotearoa",
    regionZh: "南太平洋與奧特亞羅瓦",
    associatedWith: "Sea routes, estuaries, guardianship, warning, ancestral power",
    associatedWithZh: "海路、河口、守護、警示、祖靈之力",
    era: "Polynesian and Maori ancestral tradition",
    eraZh: "玻里尼西亞與毛利祖靈傳統",
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
      "In Polynesian and Maori traditions, the great water-being is not only feared but respected as a guardian of channels, coasts, and thresholds. The taniwha belongs to tidal places where danger and protection are often the same force.",
    descriptionZh:
      "在玻里尼西亞與毛利傳統中，這種巨大的水中存在不僅令人敬畏，也被尊為水道、海岸與門檻之地的守護者。塔尼法棲於潮汐出沒之處，在那裡，危險與保護往往是一體兩面。",
    atmosphere: "Across the South Pacific, serpent guardians move through surf, reefs, and ancestral waters.",
    atmosphereZh: "在南太平洋，蛇形守護者穿行於浪頭、礁岸與祖靈之水之間。",
    mapPosition: { x: 84.0, y: 46.0 },
    color: "#7fb7b9",
    glowColor: "rgba(127, 183, 185, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/polynesia-pacific-oceanic-serpent-sea-guardian.webp",
  },
];
