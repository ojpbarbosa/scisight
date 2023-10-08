package org.SciSight.utils;

import lombok.RequiredArgsConstructor;
import org.SciSight.model.RelatedAPI;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProcessRelatedData {
    public List<String> spaceFromSpace = Arrays.asList(
      "NASA's development in propulsion technology significantly impacts deep-space exploration. This advancement allows spacecraft to travel further, faster, and more efficiently, opening avenues for exploring new frontiers and conducting advanced scientific research.",

      "Improvements in satellite technology, spearheaded by NASA, play a pivotal role in advancing space-based observation. Enhanced satellite capabilities facilitate better monitoring and data collection, crucial for understanding various space and Earth phenomena.",

      "NASA's commitment to advancing space habitat research directly impacts life in space. The development of sustainable living conditions is crucial for the success of long-term space missions and the possibility of establishing human colonies on other planets.",

      "Through continuous innovation, NASA contributes significantly to space robotics. Advanced robotics technology not only aids in the maintenance and repair of space equipment but also plays a crucial role in collecting samples and conducting experiments in space.",

      "NASA's investment in space telescopes, like the Hubble and the James Webb, profoundly impacts our understanding of the universe. These cutting-edge telescopes provide unparalleled images of distant celestial bodies, offering insight into the origins of the cosmos.",

      "The Orion spacecraft, developed by NASA, is designed for deep space exploration. Orion's advanced technologies provide a safer and more efficient vehicle, supporting future crewed missions to the Moon, Mars, and beyond.",

      "NASA's advancements in communication technology ensure reliable and high-speed data transmission from space to Earth. This tech enhancement is vital for the success of various space missions, enabling accurate monitoring and control from ground stations.",

      "The development of space suits by NASA plays an indispensable role in astronaut safety. Innovations in suit technology offer enhanced protection and mobility, allowing astronauts to perform complex tasks during spacewalks and extravehicular activities.",

      "NASA’s research and development in space weather forecasting profoundly impact space travel and satellite operation. Accurate predictions of solar flares and cosmic radiation are crucial for protecting astronauts and maintaining the integrity of space equipment.",

      "The Artemis program by NASA aims to land the first woman and the next man on the Moon. This mission not only marks a significant milestone in space exploration but also serves as a testbed for the technologies required for future Mars exploration."
    );
    public List<RelatedAPI> spaceAPI = Arrays.asList(
      RelatedAPI.builder()
        .api("NASA Open APIs")
        .reason("NASA's comprehensive set of APIs provides access to various data related to space exploration, astronomy, and aeronautics, including images, videos, and information about planets, astronauts, and space missions.")
        .build(),
      RelatedAPI.builder()
        .api("Asterank API")
        .reason("Asterank offers scientific data about asteroids, helping researchers and enthusiasts access information on asteroid sizes, trajectories, and compositions.")
        .build(),
      RelatedAPI.builder()
        .api("Open Notify API")
        .reason("Open Notify provides real-time information on the International Space Station (ISS) location and the astronauts currently in space, supporting space tracking and observation activities.")
        .build(),
      RelatedAPI.builder()
        .api("SpaceX API")
        .reason("The SpaceX API offers detailed data on SpaceX launches, rockets, capsules, and related space technology, providing insights into private sector space exploration initiatives.")
        .build(),
      RelatedAPI.builder()
        .api("Hubble Heritage Project API")
        .reason("This API provides access to a vast collection of images and data captured by the Hubble Space Telescope, supporting astronomers and researchers in their study of the universe.")
        .build()
    );
    public List<String> spaceFromClimate = Arrays.asList(
      "NASA’s satellite technology significantly impacts climate studies by providing precise data on Earth's atmosphere, oceans, and land surfaces, helping scientists understand the complex interactions within the Earth's climate system.",

      "Through observing Earth from space, NASA provides invaluable data on climate change. Satellites monitor crucial indicators such as sea level rise, greenhouse gas concentrations, and shrinking ice caps, offering indisputable evidence on the state of the planet’s climate.",

      "The development and launch of weather satellites by NASA have revolutionized meteorology. These satellites provide real-time data on atmospheric conditions, enabling accurate weather predictions and early warnings for natural disasters like hurricanes and tornadoes.",

      "NASA’s Earth Observing System (EOS) is a coordinated series of satellites for long-term global observations of the land surface, biosphere, atmosphere, and oceans. This initiative helps in understanding the Earth as an integrated system, providing crucial climate data.",

      "NASA's Gravity Recovery and Climate Experiment (GRACE) satellites have provided unprecedented insights into Earth's water movement, crucial for studying changes in sea level and understanding the implications of climate change on global water cycles.",

      "NASA’s Aerosol Monitoring satellites offer vital data on particulate matter in the atmosphere. Understanding aerosol concentrations is crucial for studying their impact on climate, weather patterns, and human health.",

      "The technology developed for space exploration has been adapted for climate research. Instruments originally designed for studying the atmospheres of other planets are now used to monitor Earth’s atmosphere, providing essential data on ozone depletion and greenhouse gases.",

      "NASA's CloudSat satellite provides detailed insights into the structure of clouds, which is crucial for understanding their impact on climate. It aids in predicting how clouds influence the distribution of solar energy, affecting Earth's climate and weather patterns.",

      "NASA’s Orbiting Carbon Observatory satellites precisely measure carbon dioxide in the atmosphere, providing scientists with critical data to understand the impact of human activities on climate change and helping to improve predictions about future environmental changes.",

      "NASA’s Soil Moisture Active Passive (SMAP) satellite monitors the moisture level of soil globally, providing vital data for drought prediction, flood risk assessment, and agricultural productivity, aiding in the understanding and mitigation of climate change effects."
    );
    public List<String> spaceFromHealth = Arrays.asList(
      "NASA’s technological advancements have led to the development of telemedicine, enabling health professionals to provide remote care and consultation to patients in areas with limited access to medical facilities, improving healthcare accessibility globally.",

      "Space research has significantly contributed to the improvement of medical imaging devices. Technologies developed by NASA for space exploration have been adapted to produce clearer and more detailed images, aiding in accurate diagnosis and treatment planning.",

      "The microgravity in space has been pivotal for biological research. Studying the effects of space on the human body helps researchers understand aging, osteoporosis, and muscle atrophy, leading to the development of new treatments and prevention strategies on Earth.",

      "Research conducted in space has provided valuable insights into human physiology, leading to the development of countermeasures for bone density loss. These findings have applications in treating osteoporosis and improving the lives of patients suffering from bone diseases.",

      "NASA’s work on air purification technologies in spacecraft has had applications in improving indoor air quality on Earth. This technology helps in removing airborne pollutants and ensuring a cleaner and healthier environment in medical facilities and homes.",

      "Technology developed for monitoring astronauts’ vital signs during space missions is used in wearable devices that track health metrics. These wearables aid individuals and healthcare professionals in monitoring and managing health and wellness effectively.",

      "The development of robotic and tele-robotic surgery has been significantly influenced by technologies designed for space exploration. These advancements allow for precise and minimally invasive procedures, improving patient recovery times and surgical outcomes.",

      "NASA’s innovations in water purification for space missions have been adapted to provide access to clean and safe drinking water in regions lacking infrastructure, preventing waterborne diseases and promoting public health.",

      "Research conducted in space laboratories has led to breakthroughs in the understanding of bacteria and viruses. This knowledge is crucial for developing new vaccines and treatments, improving public health and preventing the spread of infectious diseases.",

      "The demanding environment of space has led to the development of portable, compact, and efficient medical equipment. These devices are essential in emergency and disaster relief scenarios, providing immediate medical support in critical situations."
    );
    public List<String> climateFromSpace = Arrays.asList(
      "The Earth's atmospheric conditions significantly influence space launch schedules. Adverse weather, such as lightning, high winds, or severe temperatures, can delay or cancel planned launches, affecting the timelines of space missions and research projects.",

      "Changes in the Earth’s climate can affect the atmosphere’s density at different altitudes. This variation influences the drag experienced by satellites and space debris, affecting their orbits and requiring more frequent adjustments to prevent collisions and ensure proper function.",

      "Space-based assets like satellites are vulnerable to the Earth’s geomagnetic storms, which are influenced by solar activities. Understanding and predicting these storms are essential for protecting satellite integrity and functionality during significant solar events.",

      "The Earth’s climate has direct implications on the technology used in space missions. For instance, increasing atmospheric temperatures may necessitate the development of more heat-resistant materials and technologies for successful space exploration.",

      "Climate-induced alterations in the Earth’s atmosphere impact the visibility and operability of telescopes and other observation equipment based on the ground. This change necessitates adjustments and recalibrations to maintain accurate data collection and research validity.",

      "Space exploration relies on precise calculations and predictions. An understanding of the Earth's climate system and atmospheric dynamics is crucial for planning trajectories and launch windows for space missions, ensuring safe and efficient travel.",

      "The rise in global temperatures affects the cooling systems of ground-based space infrastructure. Adequate climate control is vital for the sensitive equipment used in space research and satellite control centers to function optimally.",

      "Climatic changes can influence the physical characteristics of the launch sites, including ground stability and sea levels. Maintaining and securing these launch sites amidst changing climate conditions is essential for the continued success of space missions.",

      "Accurate climate data and predictions are crucial for planning long-term space missions. Understanding the Earth’s atmospheric and climatic conditions allows for better planning and execution of launches, space travel, and re-entry operations.",

      "Increasing frequency and intensity of hurricanes and other extreme weather events due to climate change can lead to more frequent disruptions and damages to space launch infrastructure, leading to delays and increased costs in space exploration projects."
    );
    public List<RelatedAPI> climateAPI = Arrays.asList(
      RelatedAPI.builder()
        .api("NOAA - National Oceanic and Atmospheric Administration API")
        .reason("The NOAA API offers comprehensive data on weather conditions, climate trends, and atmospheric patterns, providing valuable insights for climate research and weather forecasting.")
        .build(),
      RelatedAPI.builder()
        .api("NASA’s Earth Observing System Data and Information System (EOSDIS) API")
        .reason("NASA's EOSDIS API provides access to a wide array of Earth observation data, including climate variables and environmental parameters, supporting the study of climate change and environmental science.")
        .build(),
      RelatedAPI.builder()
        .api("USGS - United States Geological Survey API")
        .reason("The USGS API provides data on natural resources, geology, and natural hazards, which are crucial for understanding and predicting climate-related events and changes.")
        .build(),
      RelatedAPI.builder()
        .api("EPA - Environmental Protection Agency API")
        .reason("EPA's API offers data on air quality, water conditions, and environmental pollutants, facilitating the monitoring and analysis of environmental health and climate change.")
        .build(),
      RelatedAPI.builder()
        .api("NWS - National Weather Service API")
        .reason("NWS API delivers real-time weather alerts and forecasts, helping users prepare for and respond to various weather conditions and climate-related events.")
        .build()
    );

    public List<String> climateFromClimate = Arrays.asList(
      "Climate change directly influences weather patterns, leading to increased frequency and severity of extreme weather events. Understanding these changes is crucial for predicting and mitigating the impacts of hurricanes, droughts, floods, and heatwaves on communities and ecosystems.",

      "Rising global temperatures cause the polar ice caps to melt, resulting in rising sea levels. This phenomenon poses a threat to coastal regions, affecting local climates, causing erosion, and increasing the risk of devastating floods during storms.",

      "Alterations in climate affect global water cycles, leading to changes in precipitation patterns. These shifts can result in regions experiencing prolonged drought conditions, while others may face increased rainfall and flooding, affecting agriculture, water resources, and human settlements.",

      "The increase in atmospheric CO2 levels due to human activities influences the Earth’s climate by trapping heat. Understanding the dynamics of greenhouse gases is essential for modeling and predicting future climate scenarios and developing strategies for mitigation and adaptation.",

      "Climate change affects biodiversity and ecosystems, altering habitats and contributing to the loss of species. Studying these impacts is vital for conservation efforts and understanding how these changes may influence various environmental services and functions.",

      "Ocean acidification, caused by the absorption of excess CO2, has significant implications for marine life and ecosystems. Understanding this process is crucial for predicting its impact on global fisheries, biodiversity, and ecosystem stability.",

      "Changes in climate have direct impacts on human health, increasing the prevalence and range of vector-borne diseases. Research in climate science is vital for predicting these shifts and developing public health responses to prevent outbreaks and protect communities.",

      "Climate research is crucial for developing renewable energy solutions. Understanding solar and wind patterns, for example, allows for the optimization of solar panels and wind turbines, contributing to the development of efficient and sustainable energy systems.",

      "The study of climate provides valuable insights into agricultural productivity and food security. Changes in temperature and precipitation patterns influence crop yields and livestock, and understanding these dynamics is vital for ensuring food availability for growing populations.",

      "Climate science is fundamental for the development of policies and practices related to climate adaptation and mitigation. Accurate data and predictions inform governmental and organizational strategies for addressing the challenges posed by climate change."
    );

    public List<String> climateFromHealth = Arrays.asList(
      "Climate change significantly impacts public health by intensifying heatwaves, which exacerbates conditions like heat stress and cardiovascular failure, especially in vulnerable populations such as the elderly and children.",

      "Increased temperatures and altered precipitation patterns facilitate the spread of vector-borne diseases like malaria and dengue fever. Understanding climate change is vital for predicting disease transmission and planning effective prevention and control strategies.",

      "Extreme weather events due to climate change, such as hurricanes, floods, and droughts, have immediate and long-term health impacts, including injury, mental health challenges, and disruption of healthcare services, necessitating robust emergency preparedness and response systems.",

      "Climate change affects air quality by increasing the frequency and intensity of wildfires and promoting conditions conducive to air pollution. These changes can exacerbate respiratory conditions like asthma and affect the overall health of affected populations.",

      "Climate-induced food insecurity due to changing crop yields affects nutritional health. Ensuring food security under changing climate conditions is crucial for maintaining the health and well-being of communities globally.",

      "Rising temperatures and irregular weather patterns affect the social determinants of health, including clean air, safe drinking water, sufficient food, secure shelter, and occupational safety, necessitating comprehensive public health planning and response.",

      "The effects of climate change on mental health are becoming increasingly evident, as unpredictable and severe weather events can cause stress, anxiety, and trauma, emphasizing the need for mental health services and support in affected communities.",

      "The increasing prevalence of extreme weather events impacts healthcare infrastructure, potentially damaging facilities and equipment, disrupting services, and creating additional challenges for healthcare provision during crisis situations.",

      "Climate change may exacerbate existing health inequalities, as marginalized and socio-economically disadvantaged groups are often more susceptible to the health impacts of climate change, necessitating equitable public health interventions and policies.",

      "Understanding the health impacts of climate change is crucial for developing adaptive and resilient healthcare systems capable of anticipating and responding to new challenges posed by a changing climate, safeguarding public health and well-being."
    );
    public List<String> healthFromSpace = Arrays.asList(
      "Understanding human physiology in microgravity is crucial for long-term space missions. Research on astronauts’ health provides insights into the effects of space travel on the human body, guiding the development of countermeasures to protect astronauts from the adverse impacts of space environments.",

      "Advancements in telemedicine, spurred by the need to provide healthcare to astronauts in space, have direct applications on Earth. These technologies enable medical professionals to offer diagnosis and treatment to patients in remote or inaccessible locations, improving healthcare accessibility.",

      "Space missions require innovative medical technologies and protocols to address health emergencies. The development of compact, effective, and automated medical devices for space travel can revolutionize emergency and routine healthcare delivery in constrained environments on Earth.",

      "Space-based research contributes to our understanding of fundamental biological processes. Studies conducted in the unique environment of space have led to breakthroughs in the understanding of diseases like osteoporosis and muscle atrophy, with implications for treatment and prevention.",

      "Space agencies invest in research and development of nutritious and long-lasting food for astronauts. This research contributes to improving food preservation technologies and nutritional content, with applications for addressing food security and nutrition challenges on Earth.",

      "Space radiation research is fundamental for protecting astronauts during space travel. Insights gained from this research inform our understanding of radiation's effects on the human body, contributing to the development of protective measures and treatments for radiation exposure.",

      "Space exploration necessitates monitoring and maintaining the mental health of astronauts. Research in this area provides valuable insights into coping strategies and psychological support mechanisms for individuals living and working in isolated and confined environments.",

      "Technological innovations developed for space medicine, including imaging technologies, wearable devices, and diagnostic equipment, have widespread applications in healthcare. These tools enhance medical diagnostics, monitoring, and treatment, improving healthcare outcomes and efficiency.",

      "The development of pharmaceuticals for space travel, where storage space and shelf life are concerns, has led to innovations in drug formulation and delivery. These advancements have applications in developing more effective and durable medications for use on Earth.",

      "Space agencies collaborate with healthcare institutions to translate space research findings into medical practice. The interdisciplinary nature of space and health research accelerates scientific discovery and technological innovation, benefiting both fields."
    );
    public List<String> healthFromClimate = Arrays.asList(
      "Public health initiatives play a crucial role in addressing climate change by promoting sustainable practices, reducing greenhouse gas emissions from the healthcare sector, and advocating for policies that mitigate climate-related health risks.",

      "Climate-sensitive diseases are deeply studied in public health, enabling better understanding and forecasting of disease patterns. This knowledge is vital for preparing communities and healthcare systems for outbreaks related to climatic conditions, such as vector-borne diseases.",

      "Health professionals are at the forefront of dealing with the effects of extreme weather events. Their insights and experiences in managing health crises arising from these events are valuable in developing and implementing effective climate adaptation and resilience strategies.",

      "Research on the health impacts of climate change informs public understanding and policy making, highlighting the urgency of climate action. Health professionals play a pivotal role in communicating the immediate and long-term health benefits of addressing climate change.",

      "The healthcare sector is actively involved in climate mitigation efforts, adopting renewable energy, improving energy efficiency, and minimizing waste. Sustainable healthcare practices not only reduce environmental impact but also enhance community health and well-being.",

      "Health research contributes to understanding the socio-economic factors influencing vulnerability to climate change. Addressing social determinants of health is essential for reducing health disparities and building communities’ capacity to adapt to climate change.",

      "Preventive healthcare measures, such as vaccination and health education, are essential for protecting communities from climate-sensitive diseases. These preventive strategies are crucial components of comprehensive climate change adaptation plans.",

      "Healthcare facilities are increasingly designed and operated with climate resilience in mind. Energy-efficient, resilient healthcare infrastructure is essential for providing uninterrupted healthcare services during extreme weather events and reducing the sector's carbon footprint.",

      "Public health surveillance and monitoring systems track climate-related illnesses and diseases. These systems are indispensable tools for understanding the health effects of climate change, anticipating health risks, and planning effective public health responses.",

      "Community health initiatives that address climate change contribute to building social cohesion and community resilience. Engaged and informed communities are better prepared to cope with the health impacts of climate change and actively participate in climate mitigation and adaptation efforts."
    );
    public List<String> healthFromHealth = Arrays.asList(
      "The integration of telemedicine and digital health platforms has revolutionized patient care, improving accessibility and efficiency. These technologies allow for remote monitoring and consultations, facilitating timely medical intervention and reducing the need for physical visits.",

      "Research and development in pharmacology continually yield new medications and therapies, enhancing treatment options for various diseases and conditions. Advances in drug design and delivery systems improve efficacy and reduce side effects, contributing to better patient outcomes.",

      "Innovations in diagnostic technologies facilitate early and accurate detection of diseases, which is crucial for effective treatment and management. Novel imaging techniques and point-of-care testing devices enable prompt diagnosis, supporting personalized medicine and preventive care.",

      "Healthcare data analytics employs sophisticated algorithms to analyze large datasets, identifying patterns and trends in health and disease. This data-driven approach supports clinical decision-making, risk prediction, and the development of targeted intervention strategies.",

      "Continuous improvement in surgical techniques and equipment has enhanced the safety and success of surgical procedures. Minimally invasive surgeries, robotic assistance, and advanced anesthesia practices minimize patient trauma and expedite recovery.",

      "Investments in mental health services and research have expanded understanding and awareness of mental health issues. The development and accessibility of psychotherapies, counseling, and medications support the prevention and treatment of mental illnesses, improving quality of life.",

      "Public health initiatives focused on prevention, vaccination, and education effectively control and eradicate infectious diseases. These programs protect communities from disease outbreaks, reducing morbidity and mortality rates while promoting overall public health.",

      "The field of regenerative medicine and stem cell research offers promising therapies for previously incurable conditions. Tissue engineering and cellular therapies facilitate the repair and regeneration of damaged organs and tissues, opening new possibilities in medical treatment.",

      "Personalized and precision medicine approaches consider individual genetic, environmental, and lifestyle factors to design tailored prevention and treatment plans. This personalized strategy enhances the effectiveness of interventions and reduces the risk of adverse reactions.",

      "Holistic and integrative medicine practices acknowledge the interconnectedness of physical, mental, and social health. These approaches promote overall wellness and prevention, employing a combination of conventional and alternative therapies to support patients’ health and well-being."
    );
    public List<RelatedAPI> healthAPI = Arrays.asList(
      RelatedAPI.builder()
        .api("CDC - Centers for Disease Control and Prevention API")
        .reason("The CDC API provides reliable information on various health-related topics, diseases, prevention methods, and more, supporting public health knowledge dissemination and decision-making.")
        .build(),
      RelatedAPI.builder()
        .api("NIH - National Institutes of Health API")
        .reason("The NIH API offers access to a vast repository of health and biomedical research, fostering innovation and facilitating the development of new therapies and treatments.")
        .build(),
      RelatedAPI.builder()
        .api("FDA - Food and Drug Administration API")
        .reason("The FDA API allows users to access data on approved drugs, medical devices, and food products, ensuring compliance with safety standards and regulations.")
        .build(),
      RelatedAPI.builder()
        .api("NLM - National Library of Medicine API")
        .reason("Through the NLM API, users can access extensive resources on medical literature, clinical trials, and health information, supporting healthcare professionals and researchers.")
        .build(),
      RelatedAPI.builder()
        .api("CMS - Centers for Medicare & Medicaid Services API")
        .reason("The CMS API provides information on healthcare coverage, service providers, and reimbursement policies, assisting healthcare institutions and professionals in navigating the healthcare system.")
        .build()
    );
}
