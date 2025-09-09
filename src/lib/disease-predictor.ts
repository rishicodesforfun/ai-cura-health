import * as tf from '@tensorflow/tfjs';

// Define types for our data
interface Symptom {
  name: string;
  index: number;
}

interface Disease {
  name: string;
  symptoms: string[];
  description: string;
  severity: 'low' | 'medium' | 'high';
}

// Disease data with descriptions and severity levels
const DISEASE_INFO: Record<string, { description: string; severity: 'low' | 'medium' | 'high' }> = {
  "Fungal infection": {
    description: "A fungal infection is an illness caused by fungi that can affect skin, nails, or internal organs.",
    severity: "low"
  },
  "Allergy": {
    description: "An allergic reaction occurs when the immune system overreacts to a harmless substance.",
    severity: "low"
  },
  "GERD": {
    description: "Gastroesophageal reflux disease (GERD) is a digestive disorder that affects the lower esophageal sphincter.",
    severity: "medium"
  },
  "Chronic cholestasis": {
    description: "A condition where bile flow from the liver is reduced or stopped, leading to liver damage.",
    severity: "high"
  },
  "Drug Reaction": {
    description: "An adverse reaction that occurs when taking medications, ranging from mild rashes to severe complications.",
    severity: "medium"
  },
  "Peptic ulcer disease": {
    description: "Sores that develop on the lining of the stomach, lower esophagus, or small intestine.",
    severity: "medium"
  },
  "AIDS": {
    description: "Acquired immunodeficiency syndrome (AIDS) is a chronic, potentially life-threatening condition caused by HIV.",
    severity: "high"
  },
  "Diabetes": {
    description: "A group of metabolic disorders characterized by high blood sugar levels over a prolonged period.",
    severity: "high"
  },
  "Gastroenteritis": {
    description: "Inflammation of the stomach and intestines, typically caused by viral or bacterial infection.",
    severity: "medium"
  },
  "Bronchial Asthma": {
    description: "A respiratory condition causing difficulty in breathing due to airway constriction.",
    severity: "medium"
  },
  "Hypertension": {
    description: "A condition where the force of the blood against artery walls is too high.",
    severity: "high"
  },
  "Migraine": {
    description: "A neurological condition characterized by intense, throbbing headaches often accompanied by other symptoms.",
    severity: "low"
  },
  "Cervical spondylosis": {
    description: "A degenerative condition affecting the discs and joints in the neck.",
    severity: "low"
  },
  "Paralysis (brain hemorrhage)": {
    description: "Loss of muscle function due to bleeding in the brain, often causing stroke-like symptoms.",
    severity: "high"
  },
  "Jaundice": {
    description: "Yellowing of the skin and eyes due to high bilirubin levels in the blood.",
    severity: "medium"
  },
  "Malaria": {
    description: "A mosquito-borne infectious disease affecting red blood cells and causing flu-like symptoms.",
    severity: "high"
  },
  "Chicken pox": {
    description: "A highly contagious viral infection causing an itchy, blister-like rash all over the body.",
    severity: "low"
  },
  "Dengue": {
    description: "A mosquito-borne tropical disease causing severe flu-like symptoms and potentially life-threatening complications.",
    severity: "high"
  },
  "Typhoid": {
    description: "A bacterial infection that can spread throughout the body, affecting many organs.",
    severity: "high"
  },
  "Hepatitis A": {
    description: "A highly contagious liver infection caused by the hepatitis A virus.",
    severity: "medium"
  },
  "Hepatitis B": {
    description: "A serious liver infection caused by the hepatitis B virus that can become chronic.",
    severity: "high"
  },
  "Hepatitis C": {
    description: "A viral infection that causes liver inflammation, sometimes leading to serious liver damage.",
    severity: "high"
  },
  "Hepatitis D": {
    description: "A serious liver disease caused by the hepatitis D virus, which only occurs in people already infected with hepatitis B.",
    severity: "high"
  },
  "Hepatitis E": {
    description: "A liver disease caused by the hepatitis E virus, typically spread through contaminated water.",
    severity: "medium"
  },
  "Alcoholic hepatitis": {
    description: "Liver inflammation caused by drinking alcohol, which can lead to permanent liver damage.",
    severity: "high"
  },
  "Tuberculosis": {
    description: "A potentially serious infectious disease that mainly affects the lungs.",
    severity: "high"
  },
  "Common Cold": {
    description: "A viral infection of the upper respiratory tract that affects the nose and throat.",
    severity: "low"
  },
  "Pneumonia": {
    description: "An infection that inflames the air sacs in one or both lungs, which may fill with fluid.",
    severity: "high"
  },
  "Dimorphic hemorrhoids (piles)": {
    description: "Swollen and inflamed veins in the rectum and anus causing pain and bleeding.",
    severity: "low"
  },
  "Heart attack": {
    description: "Occurs when blood flow to part of the heart is blocked, causing damage to the heart muscle.",
    severity: "high"
  },
  "Varicose veins": {
    description: "Enlarged, twisted veins that usually appear on the legs and feet.",
    severity: "low"
  },
  "Hypothyroidism": {
    description: "A condition where the thyroid gland doesn't produce enough hormones.",
    severity: "medium"
  },
  "Hyperthyroidism": {
    description: "A condition where the thyroid gland produces too much of certain hormones.",
    severity: "medium"
  },
  "Hypoglycemia": {
    description: "A condition characterized by an abnormally low level of blood sugar.",
    severity: "medium"
  },
  "Osteoarthritis": {
    description: "A degenerative joint disease that occurs when cartilage in joints breaks down over time.",
    severity: "low"
  },
  "Arthritis": {
    description: "Inflammation of one or more joints, causing pain and stiffness.",
    severity: "medium"
  },
  "(vertigo) Paroxysmal Positional Vertigo": {
    description: "A disorder that causes brief, repeated episodes of dizziness due to specific head movements.",
    severity: "low"
  },
  "Acne": {
    description: "A skin condition that occurs when hair follicles become clogged with oil and dead skin cells.",
    severity: "low"
  },
  "Urinary tract infection": {
    description: "An infection in any part of the urinary system, including kidneys, bladder, and urethra.",
    severity: "medium"
  },
  "Psoriasis": {
    description: "A skin condition that causes red, itchy, scaly patches, most commonly on the knees, elbows, trunk, and scalp.",
    severity: "medium"
  },
  "Impetigo": {
    description: "A highly contagious skin infection that mainly affects infants and children, causing red sores.",
    severity: "low"
  }
};

// Process the dataset to create our model training data
class DiseasePredictor {
  private symptoms: Symptom[] = [];
  private diseases: Disease[] = [];
  private model: tf.LayersModel | null = null;
  private isTrained: boolean = false;

  constructor() {
    this.initializeData();
  }

  // Initialize with the dataset
  private initializeData() {
    // This would normally be loaded from the CSV file
    // For now, we'll use a simplified version of the data
    const rawData = [
      ["Fungal infection", "itching", "skin_rash", "nodal_skin_eruptions", "dischromic _patches"],
      ["Fungal infection", "skin_rash", "nodal_skin_eruptions", "dischromic _patches"],
      ["Allergy", "continuous_sneezing", "shivering", "chills", "watering_from_eyes"],
      ["Allergy", "shivering", "chills", "watering_from_eyes"],
      ["GERD", "stomach_pain", "acidity", "ulcers_on_tongue", "vomiting", "cough", "chest_pain"],
      ["GERD", "acidity", "ulcers_on_tongue", "vomiting", "cough"],
      ["Chronic cholestasis", "itching", "vomiting", "yellowish_skin", "nausea", "loss_of_appetite", "abdominal_pain", "yellowing_of_eyes"],
      ["Chronic cholestasis", "vomiting", "yellowish_skin", "nausea", "abdominal_pain"],
      ["Drug Reaction", "itching", "skin_rash", "stomach_pain", "burning_micturition", "spotting_ urination"],
      ["Drug Reaction", "skin_rash", "stomach_pain", "burning_micturition"],
      ["Peptic ulcer disease", "vomiting", "loss_of_appetite", "abdominal_pain", "passage_of_gases", "internal_itching"],
      ["Peptic ulcer disease", "loss_of_appetite", "abdominal_pain", "passage_of_gases"],
      ["AIDS", "muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"],
      ["AIDS", "patches_in_throat", "high_fever", "extra_marital_contacts"],
      ["Diabetes", "fatigue", "weight_loss", "restlessness", "lethargy", "irregular_sugar_level", "blurred_and_distorted_vision", "obesity"],
      ["Diabetes", "weight_loss", "restlessness", "lethargy", "irregular_sugar_level"],
      ["Gastroenteritis", "vomiting", "sunken_eyes", "dehydration", "diarrhoea"],
      ["Gastroenteritis", "sunken_eyes", "dehydration", "diarrhoea"],
      ["Bronchial Asthma", "fatigue", "cough", "high_fever", "breathlessness", "family_history", "mucoid_sputum"],
      ["Bronchial Asthma", "cough", "high_fever", "breathlessness", "family_history"],
      ["Hypertension", "headache", "chest_pain", "dizziness", "loss_of_balance", "lack_of_concentration"],
      ["Hypertension", "chest_pain", "dizziness", "loss_of_balance"],
      ["Migraine", "headache", "blurred_and_distorted_vision", "excessive_hunger", "stiff_neck", "depression", "irritability", "visual_disturbances"],
      ["Migraine", "headache", "blurred_and_distorted_vision", "excessive_hunger"],
      ["Cervical spondylosis", "back_pain", "weakness_in_limbs", "neck_pain", "dizziness", "loss_of_balance"],
      ["Cervical spondylosis", "back_pain", "weakness_in_limbs", "neck_pain"],
      ["Paralysis (brain hemorrhage)", "vomiting", "headache", "weakness_of_one_body_side", "alteration_in_speech"],
      ["Paralysis (brain hemorrhage)", "headache", "weakness_of_one_body_side", "alteration_in_speech"],
      ["Jaundice", "itching", "vomiting", "fatigue", "weight_loss", "high_fever", "yellowish_skin", "dark_urine", "abdominal_pain"],
      ["Jaundice", "vomiting", "fatigue", "high_fever", "yellowish_skin"],
      ["Malaria", "chills", "vomiting", "high_fever", "sweating", "headache", "nausea", "muscle_pain"],
      ["Malaria", "chills", "vomiting", "high_fever", "sweating"],
      ["Chicken pox", "itching", "skin_rash", "fatigue", "lethargy", "high_fever", "headache", "loss_of_appetite", "mild_fever", "swelled_lymph_nodes", "malaise", "red_spots_over_body"],
      ["Chicken pox", "skin_rash", "fatigue", "lethargy", "high_fever"],
      ["Dengue", "skin_rash", "chills", "joint_pain", "vomiting", "fatigue", "high_fever", "headache", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "malaise", "muscle_pain", "red_spots_over_body"],
      ["Dengue", "skin_rash", "chills", "joint_pain", "vomiting"],
      ["Typhoid", "chills", "vomiting", "fatigue", "high_fever", "headache", "nausea", "constipation", "abdominal_pain", "diarrhoea", "toxic_look_(typhos)", "belly_pain"],
      ["Typhoid", "chills", "vomiting", "fatigue", "high_fever"],
      ["Hepatitis A", "joint_pain", "vomiting", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "diarrhoea", "mild_fever", "yellowing_of_eyes", "muscle_pain"],
      ["Hepatitis A", "joint_pain", "vomiting", "yellowish_skin", "dark_urine"],
      ["Hepatitis B", "itching", "fatigue", "lethargy", "yellowish_skin", "dark_urine", "loss_of_appetite", "abdominal_pain", "yellow_urine", "yellowing_of_eyes", "malaise", "receiving_blood_transfusion", "receiving_unsterile_injections"],
      ["Hepatitis B", "itching", "fatigue", "lethargy", "yellowish_skin"],
      ["Hepatitis C", "fatigue", "yellowish_skin", "nausea", "loss_of_appetite", "family_history"],
      ["Hepatitis C", "fatigue", "yellowish_skin", "nausea"],
      ["Hepatitis D", "joint_pain", "vomiting", "fatigue", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "yellowing_of_eyes"],
      ["Hepatitis D", "joint_pain", "vomiting", "fatigue", "yellowish_skin"],
      ["Hepatitis E", "joint_pain", "vomiting", "fatigue", "high_fever", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "yellowing_of_eyes", "coma", "stomach_bleeding"],
      ["Hepatitis E", "joint_pain", "vomiting", "fatigue", "high_fever"],
      ["Alcoholic hepatitis", "vomiting", "yellowish_skin", "abdominal_pain", "swelling_of_stomach", "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload"],
      ["Alcoholic hepatitis", "vomiting", "yellowish_skin", "abdominal_pain"],
      ["Tuberculosis", "chills", "vomiting", "fatigue", "weight_loss", "cough", "high_fever", "sweating", "loss_of_appetite", "mild_fever", "yellowing_of_eyes", "swelled_lymph_nodes", "malaise", "phlegm", "chest_pain", "blood_in_sputum"],
      ["Tuberculosis", "chills", "vomiting", "fatigue", "weight_loss"],
      ["Common Cold", "continuous_sneezing", "chills", "fatigue", "cough", "high_fever", "headache", "swelled_lymph_nodes", "malaise", "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "loss_of_smell", "muscle_pain"],
      ["Common Cold", "continuous_sneezing", "chills", "fatigue", "cough"],
      ["Pneumonia", "chills", "fatigue", "cough", "high_fever", "breathlessness", "sweating", "malaise", "chest_pain", "fast_heart_rate", "rusty_sputum"],
      ["Pneumonia", "chills", "fatigue", "cough", "high_fever"],
      ["Dimorphic hemorrhoids (piles)", "constipation", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool", "irritation_in_anal_region"],
      ["Dimorphic hemorrhoids (piles)", "constipation", "pain_during_bowel_movements", "pain_in_anal_region"],
      ["Heart attack", "vomiting", "breathlessness", "sweating", "chest_pain"],
      ["Heart attack", "vomiting", "breathlessness", "sweating"],
      ["Varicose veins", "fatigue", "cramping", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels", "prominent_veins_on_calf"],
      ["Varicose veins", "fatigue", "cramping", "bruising"],
      ["Hypothyroidism", "fatigue", "weight_gain", "cold_hands_and_feets", "mood_swings", "lethargy", "dizziness", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "depression", "irritability"],
      ["Hypothyroidism", "fatigue", "weight_gain", "cold_hands_and_feets"],
      ["Hyperthyroidism", "fatigue", "mood_swings", "weight_loss", "restlessness", "sweating", "diarrhoea", "fast_heart_rate", "excessive_hunger"],
      ["Hyperthyroidism", "fatigue", "mood_swings", "weight_loss"],
      ["Hypoglycemia", "vomiting", "fatigue", "anxiety", "sweating", "headache", "nausea", "blurred_and_distorted_vision", "excessive_hunger", "slurred_speech", "irritability", "palpitations"],
      ["Hypoglycemia", "vomiting", "fatigue", "anxiety", "sweating"],
      ["Osteoarthritis", "joint_pain", "neck_pain", "knee_pain", "hip_joint_pain", "swelling_joints", "painful_walking"],
      ["Osteoarthritis", "joint_pain", "neck_pain", "knee_pain"],
      ["Arthritis", "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness"],
      ["Arthritis", "muscle_weakness", "stiff_neck", "swelling_joints"],
      ["(vertigo) Paroxysmal Positional Vertigo", "headache", "nausea", "vomiting", "spinning_movements", "loss_of_balance", "unsteadiness"],
      ["(vertigo) Paroxysmal Positional Vertigo", "headache", "nausea", "vomiting"],
      ["Acne", "skin_rash", "pus_filled_pimples", "blackheads", "scurring"],
      ["Acne", "skin_rash", "pus_filled_pimples", "blackheads"],
      ["Urinary tract infection", "burning_micturition", "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine"],
      ["Urinary tract infection", "burning_micturition", "bladder_discomfort"],
      ["Psoriasis", "skin_rash", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails"],
      ["Psoriasis", "skin_rash", "silver_like_dusting", "small_dents_in_nails"],
      ["Impetigo", "skin_rash", "high_fever", "blister", "red_sore_around_nose", "yellow_crust_ooze"],
      ["Impetigo", "skin_rash", "high_fever", "blister"]
    ];

    // Extract all unique symptoms
    const symptomSet = new Set<string>();
    const diseaseMap = new Map<string, string[]>();
    
    rawData.forEach(row => {
      const disease = row[0];
      const symptoms = row.slice(1);
      
      symptoms.forEach(symptom => {
        symptomSet.add(symptom);
      });
      
      if (!diseaseMap.has(disease)) {
        diseaseMap.set(disease, []);
      }
      const existingSymptoms = diseaseMap.get(disease) || [];
      diseaseMap.set(disease, [...new Set([...existingSymptoms, ...symptoms])]);
    });
    
    // Create symptom index mapping
    this.symptoms = Array.from(symptomSet).map((name, index) => ({ name, index }));
    
    // Create disease data with symptoms
    this.diseases = Array.from(diseaseMap.entries()).map(([name, symptoms]) => ({
      name,
      symptoms,
      description: DISEASE_INFO[name]?.description || "No description available",
      severity: DISEASE_INFO[name]?.severity || "medium"
    }));
  }

  // Convert symptoms to feature vector
  private symptomsToVector(userSymptoms: string[]): number[] {
    const vector = new Array(this.symptoms.length).fill(0);
    
    userSymptoms.forEach(symptom => {
      const symptomObj = this.symptoms.find(s => s.name === symptom);
      if (symptomObj) {
        vector[symptomObj.index] = 1;
      }
    });
    
    return vector;
  }

  // Simple rule-based prediction (since we can't train a full model in browser)
  public predict(userSymptoms: string[]): { disease: string; confidence: number; description: string; severity: string }[] {
    // Calculate similarity scores for each disease
    const scores: { disease: string; score: number; description: string; severity: string }[] = [];
    
    this.diseases.forEach(disease => {
      let matchCount = 0;
      disease.symptoms.forEach(symptom => {
        if (userSymptoms.includes(symptom)) {
          matchCount++;
        }
      });
      
      let score = matchCount / disease.symptoms.length;
      
      // Adjust confidence based on severity and commonality
      if (disease.severity === 'low') {
        // Reduce confidence for low severity conditions
        score = score * 0.7;
      } else if (disease.severity === 'medium') {
        // Slightly reduce confidence for medium severity conditions
        score = score * 0.85;
      }
      // High severity conditions keep their original confidence
      
      if (score > 0) {
        scores.push({
          disease: disease.name,
          score,
          description: disease.description,
          severity: disease.severity
        });
      }
    });
    
    // Sort by score and return top predictions
    scores.sort((a, b) => b.score - a.score);
    
    return scores.slice(0, 5).map(item => ({
      disease: item.disease,
      confidence: Math.round(item.score * 100),
      description: item.description,
      severity: item.severity
    }));
  }

  // Get all possible symptoms for UI
  public getAllSymptoms(): string[] {
    return this.symptoms.map(s => s.name);
  }

  // Get disease information
  public getDiseaseInfo(diseaseName: string): { description: string; severity: string } | null {
    const disease = this.diseases.find(d => d.name === diseaseName);
    return disease ? { 
      description: disease.description, 
      severity: disease.severity 
    } : null;
  }
}

// Create a singleton instance
const diseasePredictor = new DiseasePredictor();

export default diseasePredictor;