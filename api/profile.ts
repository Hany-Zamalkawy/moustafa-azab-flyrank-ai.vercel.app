type ApiResponse = {
  json(value: unknown): void;
};

export default function handler(_request: unknown, response: ApiResponse) {
  response.json({
    name: "Moustafa Hany Azab",
    alias: "HANY ZAMLKAWY",
    role: "Software Engineer",
    mission: "Code. Ship. Impact.",
    email: "moustfahhany5@gmail.com",
    focus: ["Software Engineer", "Full-Stack Developer", "Data Engineering", "AI Automation"],
    socials: {
      github: "https://github.com/Hany-Zamalkawy",
      linkedin: "https://www.linkedin.com/in/moustafa-hany-azab-4550692b9/",
      whatsapp: "https://wa.me/201228494191",
      instagram: "https://www.instagram.com/hany_zamlkawy/",
      facebook: "https://www.facebook.com/Hany.Zamlkawy",
    },
  });
}
