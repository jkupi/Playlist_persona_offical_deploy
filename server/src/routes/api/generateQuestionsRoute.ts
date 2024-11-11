import express, { Request, Response } from "express";
import { generatePlaylist, generateQuestions } from "../../services/gptServices.js";
import { searchSong } from "../../services/youtubeServices.js";

const router = express.Router();
// const app = express();


router.post("/playlist", async (req: Request, res: Response) => {
    try {
      const { questions, answers } = req.body;
  
      if (!Array.isArray(questions) || !Array.isArray(answers)) {
        return res
          .status(400)
          .json({ error: "titles and artists must be arrays" });
      } else if (questions.length !== answers.length) {
        return res
          .status(400)
          .json({ error: "titles and artists arrays must have the same length" });
      }
  
      const playlist = await generatePlaylist(questions, answers);
      // console.log("returned from 2nd openaiAPI call", playlist)
  
      const playlistWithUrls = await Promise.all(
        playlist.map(async (song) => {
          // console.log("song structure:", song);
          // console.log("song:", song.songTitle, "artist:", song.artistName);
          const url = await searchSong(song.songTitle, song.artistName);
          // console.log("full song structure", song.songTitle, song.artistName, url);
          return { ...song, url: url };
        })
      );
      
      return res.json(playlistWithUrls);
    } catch (error) {
      console.error("error generating playlist", error);
      return res.status(500).json({ error: "error while generating playlist" });
    }
  });


router.get('/questions', async (_req, res) => {
    // console.log("are you here?")
    const questions = await generateQuestions();
    res.json({ questions });
});


export  { router as questionsRouter };