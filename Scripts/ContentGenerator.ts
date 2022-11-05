
export default async function generateSkills() {
    var response = await fetch('https://raw.githack.com/GeorgeKarlinzer/CV-Content/main/Data/skills.json');
    var skills = await response.json()
    console.log(skills);
}

console.log('asd');