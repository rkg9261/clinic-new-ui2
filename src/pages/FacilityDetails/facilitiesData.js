import laser from "../../assets/therapies/laser.png";
import shockwave from "../../assets/therapies/shockwave.png";
import pemf from "../../assets/therapies/pemf.png";
import terahertz from "../../assets/therapies/terahertz.png";
import magneto from "../../assets/therapies/magneto.png";
import cupping from "../../assets/therapies/cupping.png";
import cpm from "../../assets/therapies/cpm.png";
import ift from "../../assets/therapies/ift.png";
import ultrasound from "../../assets/therapies/ultrasound.png";
import taping from "../../assets/therapies/taping1.png";
import massage from "../../assets/therapies/massage.png";
import russian from "../../assets/therapies/russian.png";


export const facilitiesData = [

    /*====================================================
      1. LASER THERAPY
    ====================================================*/

    {
        id: 1,

        name: "Laser Therapy",

        shortName: "Class-3B Laser",

        category: "Pain & Tissue Healing",

        image: laser,

        description:
            "Low level laser therapy uses controlled light energy to support natural tissue healing, reduce pain and inflammation, and improve recovery."

        ,

        overview:
            "Laser therapy is a non-invasive physiotherapy modality used to support healing in muscles, tendons, ligaments and other soft tissues. The controlled light energy can help improve local circulation and cellular activity.",

        benefits: [
            "Helps reduce pain and inflammation",
            "Supports soft tissue healing",
            "Improves local blood circulation",
            "May reduce muscle stiffness",
            "Supports faster recovery"
        ],

        uses: [
            "Sports Injuries",
            "Ligament Injury",
            "Back Pain",
            "Neck Pain"
        ],

        suitableFor:
            "Patients with soft tissue injuries, sports injuries, muscle pain, ligament problems and selected chronic pain conditions.",

        treatment:
            "During treatment, the therapist positions the laser applicator over the affected area. Treatment is generally comfortable and non-invasive.",

        precautions:
            "Treatment should be performed after proper assessment by a qualified physiotherapist."
    },


    /*====================================================
      2. SHOCKWAVE
    ====================================================*/

    {
        id: 2,

        name: "Shockwave Therapy",

        shortName: "ESWT",

        category: "Pain & Tissue Recovery",

        image: shockwave,

        description:
            "Shockwave therapy delivers controlled acoustic waves to targeted tissues to support circulation, pain reduction and tissue recovery.",

        overview:
            "Extracorporeal Shockwave Therapy is a non-invasive treatment modality commonly used for selected tendon, muscle and chronic pain conditions. Controlled acoustic energy is delivered to the treatment area.",

        benefits: [
            "Helps manage chronic pain",
            "Supports tissue healing",
            "May improve local circulation",
            "Helps reduce tissue stiffness",
            "Supports functional recovery"
        ],

        uses: [
            "Heel Pain",
            "Tennis Elbow",
            "Frozen Shoulder",
            "Calcification"
        ],

        suitableFor:
            "Patients with selected tendon problems, chronic heel pain, tennis elbow and other conditions where shockwave therapy is clinically appropriate.",

        treatment:
            "The therapist applies a coupling medium and delivers controlled shockwaves to the selected treatment area.",

        precautions:
            "A physiotherapy assessment is recommended before treatment to determine whether shockwave therapy is suitable."
    },


    /*====================================================
      3. PEMF
    ====================================================*/

    {
        id: 3,

        name: "PEMF Therapy",

        shortName: "Pulsed Electromagnetic Field",

        category: "Pain & Recovery",

        image: pemf,

        description:
            "PEMF therapy uses pulsed electromagnetic fields as a supportive physiotherapy modality for pain management and tissue recovery.",

        overview:
            "Pulsed Electromagnetic Field therapy uses controlled electromagnetic fields around the treatment area. It is used as part of selected rehabilitation and pain-management programs.",

        benefits: [
            "Supports pain management",
            "May help reduce inflammation",
            "Supports tissue recovery",
            "Can complement rehabilitation",
            "Non-invasive treatment approach"
        ],

        uses: [
            "Joint Pain",
            "Arthritis",
            "Disc Problems",
            "Nerve Pain"
        ],

        suitableFor:
            "Patients requiring supportive treatment for selected joint, muscle and rehabilitation conditions.",

        treatment:
            "The affected body region is positioned within or near the therapy applicator according to the treatment protocol recommended by the physiotherapist.",

        precautions:
            "Treatment suitability should be confirmed during clinical assessment, particularly for patients with implanted electronic devices."
    },


    /*====================================================
      4. TERAHERTZ
    ====================================================*/

    {
        id: 4,

        name: "Terahertz Therapy",

        shortName: "Advanced Wave",

        category: "Advanced Recovery",

        image: terahertz,

        description:
            "Terahertz therapy uses controlled wave-based technology as a supportive modality for circulation, comfort and rehabilitation.",

        overview:
            "Terahertz therapy is an advanced modality used as part of selected physiotherapy and recovery programs. Treatment protocols are determined according to the patient's condition.",

        benefits: [
            "Supports circulation",
            "May improve tissue comfort",
            "Supports recovery programs",
            "Non-invasive treatment",
            "Can complement physiotherapy"
        ],

        uses: [
            "Muscle Pain",
            "Nerve Compression",
            "Back Pain",
            "Sports Recovery"
        ],

        suitableFor:
            "Patients requiring supportive therapy for selected muscle pain and rehabilitation conditions.",

        treatment:
            "The therapist applies the therapy device to the appropriate treatment region according to the prescribed protocol.",

        precautions:
            "Professional assessment is recommended before beginning treatment."
    },


    /*====================================================
      5. MAGNETO
    ====================================================*/

    {
        id: 5,

        name: "Magneto Therapy",

        shortName: "Magnetic Therapy",

        category: "Pain & Bone Recovery",

        image: magneto,

        description:
            "Magneto therapy uses controlled magnetic fields as a supportive treatment modality for selected pain and rehabilitation conditions.",

        overview:
            "Magneto therapy is used in physiotherapy settings as a non-invasive modality that can complement rehabilitation programs for selected musculoskeletal conditions.",

        benefits: [
            "Supports pain management",
            "Can complement rehabilitation",
            "May help reduce discomfort",
            "Non-invasive treatment",
            "Supports recovery programs"
        ],

        uses: [
            "Knee Pain",
            "Arthritis",
            "Bone Healing",
            "Inflammation"
        ],

        suitableFor:
            "Patients with selected musculoskeletal and rehabilitation needs after professional assessment.",

        treatment:
            "The treatment applicator is positioned around the selected body area and the prescribed magnetic field program is delivered.",

        precautions:
            "Patients with certain implanted electronic devices should consult their healthcare professional before treatment."
    },


    /*====================================================
      6. CUPPING
    ====================================================*/

    {
        id: 6,

        name: "Cupping Therapy",

        shortName: "Vacuum Therapy",

        category: "Muscle Relaxation",

        image: cupping,

        description:
            "Cupping therapy uses controlled suction to support muscle relaxation, local circulation and recovery.",

        overview:
            "Cupping is a complementary physiotherapy technique where cups create controlled suction over selected areas of the body. It may be incorporated into an individualized treatment plan.",

        benefits: [
            "Supports muscle relaxation",
            "May improve local circulation",
            "Can reduce feelings of muscle tightness",
            "Supports recovery",
            "Can complement manual therapy"
        ],

        uses: [
            "Muscle Tightness",
            "Neck Pain",
            "Back Pain",
            "Poor Circulation"
        ],

        suitableFor:
            "Patients with selected muscular tightness and discomfort where cupping is considered appropriate.",

        treatment:
            "The physiotherapist places cups over selected areas and applies controlled suction according to the treatment plan.",

        precautions:
            "Temporary marks can occur after cupping. Professional assessment is recommended before treatment."
    },


    /*====================================================
      7. CPM
    ====================================================*/

    {
        id: 7,

        name: "CPM Therapy",

        shortName: "Continuous Passive Motion",

        category: "Post Surgery Rehabilitation",

        image: cpm,

        description:
            "CPM therapy gently moves a joint through a controlled range of motion to support mobility during rehabilitation.",

        overview:
            "Continuous Passive Motion devices are used in selected rehabilitation programs, particularly when controlled joint movement is required after certain surgical procedures.",

        benefits: [
            "Supports controlled joint movement",
            "Helps maintain mobility",
            "Supports post-surgical rehabilitation",
            "May reduce stiffness",
            "Allows gradual movement progression"
        ],

        uses: [
            "Knee Replacement",
            "Post Surgery",
            "Joint Stiffness",
            "Rehabilitation"
        ],

        suitableFor:
            "Patients undergoing selected post-operative rehabilitation programs where passive controlled movement is prescribed.",

        treatment:
            "The patient's joint is positioned within the CPM device and the machine moves the joint through a therapist-selected range of motion.",

        precautions:
            "Range of motion and treatment duration should always follow the treating clinician's instructions."
    },


    /*====================================================
      8. IFT
    ====================================================*/

    {
        id: 8,

        name: "IFT Therapy",

        shortName: "Interferential Therapy",

        category: "Pain Management",

        image: ift,

        description:
            "Interferential therapy uses medium-frequency electrical currents as a supportive modality for pain management and muscle relaxation.",

        overview:
            "IFT is an electrotherapy modality used by physiotherapists as part of selected pain-management and rehabilitation programs.",

        benefits: [
            "Supports pain management",
            "May help relax muscles",
            "Can complement rehabilitation",
            "Supports selected recovery programs",
            "Non-invasive modality"
        ],

        uses: [
            "Back Pain",
            "Sciatica",
            "Shoulder Pain",
            "Muscle Spasm"
        ],

        suitableFor:
            "Patients with selected musculoskeletal pain and muscle spasm conditions following professional assessment.",

        treatment:
            "Electrodes are positioned around the treatment area and the therapist selects appropriate treatment parameters.",

        precautions:
            "Patients with pacemakers or certain electronic implants should consult a healthcare professional before electrotherapy."
    },


    /*====================================================
      9. ULTRASOUND
    ====================================================*/

    {
        id: 9,

        name: "Ultrasonic Therapy",

        shortName: "Therapeutic Ultrasound",

        category: "Soft Tissue Recovery",

        image: ultrasound,

        description:
            "Therapeutic ultrasound uses high-frequency sound waves as a supportive physiotherapy modality for selected soft tissue conditions.",

        overview:
            "Ultrasound therapy is commonly incorporated into physiotherapy programs for selected soft tissue and musculoskeletal conditions.",

        benefits: [
            "Supports soft tissue rehabilitation",
            "May help manage pain",
            "Can complement mobility work",
            "Supports recovery programs",
            "Non-invasive treatment"
        ],

        uses: [
            "Soft Tissue Injury",
            "Swelling",
            "Tendon Pain",
            "Muscle Injury"
        ],

        suitableFor:
            "Patients with selected tendon, muscle and soft tissue problems where ultrasound is clinically appropriate.",

        treatment:
            "A conductive gel is applied to the skin and the ultrasound head is moved over the selected treatment area.",

        precautions:
            "Treatment parameters should be selected by a qualified physiotherapist after assessment."
    },


    /*====================================================
      10. KINESIOLOGY TAPING
    ====================================================*/

    {
        id: 10,

        name: "Kinesiology Taping",

        shortName: "Sports Tape",

        category: "Support & Sports Rehabilitation",

        image: taping,

        description:
            "Kinesiology taping provides external support while allowing movement and can be incorporated into sports and rehabilitation programs.",

        overview:
            "Kinesiology tape is an elastic therapeutic tape applied to specific areas according to the patient's movement and rehabilitation requirements.",

        benefits: [
            "Provides external support",
            "Allows natural movement",
            "Can complement rehabilitation",
            "Useful in sports recovery programs",
            "May improve body awareness"
        ],

        uses: [
            "Sports Injury",
            "Knee Pain",
            "Shoulder Pain",
            "Posture"
        ],

        suitableFor:
            "Patients and athletes requiring supportive taping as part of an individualized physiotherapy program.",

        treatment:
            "The physiotherapist assesses movement and applies the tape using an appropriate technique for the treatment goal.",

        precautions:
            "Tape should not be applied over irritated or damaged skin. Remove if significant skin irritation occurs."
    },


    /*====================================================
      11. ELECTRO MASSAGE
    ====================================================*/

    {
        id: 11,

        name: "Electro Massage",

        shortName: "EMS",

        category: "Muscle Recovery",

        image: massage,

        description:
            "Electrical muscle stimulation uses controlled electrical impulses to support muscle activation, relaxation and rehabilitation.",

        overview:
            "Electro massage or EMS can be incorporated into selected physiotherapy programs to support muscle activation and recovery.",

        benefits: [
            "Supports muscle activation",
            "Can complement strengthening",
            "May help muscle relaxation",
            "Supports rehabilitation",
            "Can complement recovery programs"
        ],

        uses: [
            "Muscle Relaxation",
            "Body Pain",
            "Recovery",
            "Fatigue"
        ],

        suitableFor:
            "Patients requiring selected muscle activation or rehabilitation support following professional assessment.",

        treatment:
            "Electrodes are placed on the selected muscle group and controlled electrical impulses are delivered using appropriate settings.",

        precautions:
            "Patients with certain electronic implants should consult their healthcare professional before electrical stimulation."
    },


    /*====================================================
      12. RUSSIAN CURRENT
    ====================================================*/

    {
        id: 12,

        name: "Russian Current Therapy",

        shortName: "Russian Current",

        category: "Muscle Strengthening",

        image: russian,

        description:
            "Russian current therapy uses medium-frequency electrical stimulation to support muscle activation and strengthening during rehabilitation.",

        overview:
            "Russian current is an electrotherapy technique that may be used as part of selected strengthening and rehabilitation programs.",

        benefits: [
            "Supports muscle activation",
            "Can complement strengthening exercises",
            "Supports rehabilitation",
            "May help address muscle weakness",
            "Can complement sports recovery"
        ],

        uses: [
            "Muscle Strengthening",
            "Rehabilitation",
            "Sports Recovery",
            "Weak Muscles"
        ],

        suitableFor:
            "Patients requiring selected muscle strengthening support as part of a supervised rehabilitation program.",

        treatment:
            "Electrodes are placed over the targeted muscles and controlled electrical stimulation is delivered according to the prescribed protocol.",

        precautions:
            "Treatment should be performed under professional supervision and is not appropriate for everyone."
    }

];