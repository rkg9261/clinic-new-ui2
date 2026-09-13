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

export const therapyData = [

{
id:1,
name:"Laser Therapy",
shortName:"(Class-3B)",
icon:laser,
image:laser,
uses:[
"Sports Injuries",
"Ligament Injury",
"Back Pain",
"Neck Pain"
],
description:"Low level laser penetrates deep into tissues to reduce pain, inflammation and accelerate healing."
},

{
id:2,
name:"Shockwave Therapy",
shortName:"(ESWT)",
icon:shockwave,
image:shockwave,
uses:[
"Heel Pain",
"Tennis Elbow",
"Frozen Shoulder",
"Calcification"
],
description:"Shockwaves stimulate natural healing, improve blood circulation and repair damaged tissues."
},

{
id:3,
name:"PEMF Therapy",
shortName:"Electromagnetic",
icon:pemf,
image:pemf,
uses:[
"Joint Pain",
"Arthritis",
"Disc Problems",
"Nerve Pain"
],
description:"PEMF therapy uses pulsed electromagnetic energy to improve cellular healing and reduce inflammation."
},

{
id:4,
name:"Terahertz Therapy",
shortName:"Advanced Wave",
icon:terahertz,
image:terahertz,
uses:[
"Muscle Pain",
"Nerve Compression",
"Back Pain",
"Sports Recovery"
],
description:"Terahertz waves improve circulation and promote faster tissue regeneration."
},

{
id:5,
name:"Magneto Therapy",
shortName:"Magnetic",
icon:magneto,
image:magneto,
uses:[
"Knee Pain",
"Arthritis",
"Bone Healing",
"Inflammation"
],
description:"Magnetic stimulation helps reduce pain and accelerates recovery of injured tissues."
},

{
id:6,
name:"Cupping Therapy",
shortName:"Vacuum Therapy",
icon:cupping,
image:cupping,
uses:[
"Muscle Tightness",
"Neck Pain",
"Back Pain",
"Poor Circulation"
],
description:"Cupping therapy improves blood flow, relaxes muscles and relieves chronic pain."
},

{
id:7,
name:"CPM Therapy",
shortName:"Continuous Passive Motion",
icon:cpm,
image:cpm,
uses:[
"Knee Replacement",
"Post Surgery",
"Joint Stiffness",
"Rehabilitation"
],
description:"CPM machines gently move joints continuously to restore movement after surgery."
},

{
id:8,
name:"IFT Therapy",
shortName:"Interferential",
icon:ift,
image:ift,
uses:[
"Back Pain",
"Sciatica",
"Shoulder Pain",
"Muscle Spasm"
],
description:"IFT uses medium frequency currents to reduce pain and muscle spasms."
},

{
id:9,
name:"Ultrasonic Therapy",
shortName:"Ultrasound",
icon:ultrasound,
image:ultrasound,
uses:[
"Soft Tissue Injury",
"Swelling",
"Tendon Pain",
"Muscle Injury"
],
description:"Ultrasonic waves create deep tissue heating to speed healing and reduce inflammation."
},

{
id:10,
name:"Kinesiology Taping",
shortName:"Sports Tape",
icon:taping,
image:taping,
uses:[
"Sports Injury",
"Knee Pain",
"Shoulder Pain",
"Posture"
],
description:"Elastic therapeutic tape supports muscles and joints while allowing natural movement."
},

{
id:11,
name:"Electro Massage",
shortName:"EMS",
icon:massage,
image:massage,
uses:[
"Muscle Relaxation",
"Body Pain",
"Recovery",
"Fatigue"
],
description:"Electrical muscle stimulation relaxes muscles, improves circulation and relieves pain."
},

{
id:12,
name:"Russian Current Therapy",
shortName:"Russian Current",
icon:russian,
image:russian,
uses:[
"Muscle Strengthening",
"Rehabilitation",
"Sports Recovery",
"Weak Muscles"
],
description:"Russian current stimulates muscles with medium-frequency electrical impulses to improve strength and rehabilitation."
}

];