import { healthTipsData } from "../constants/HeathTips.js";

export const getRandomTip = (req, res) => {
    const tips = healthTipsData.health_tips;
    
    if (tips.length === 0) {
        return res.status(404).json({ success: false, message: "No health tips available." });
    }

    const randomIndex = Math.floor(Math.random() * tips.length);
    
    const randomTip = tips[randomIndex];

    res.status(200).json({ 
        success: true,
        tip: randomTip
    });
};