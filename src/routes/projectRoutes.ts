import "dotenv/config";
import { Router } from "express";
import bodyParser from "body-parser";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAllProjectsService, postProjectService, getMyProjectsService, editProjectService, shortlistApplicantService, rejectApplicantService, deleteProjectService } from "../service/project/projectService";

const router = Router();
router.use(bodyParser.json());

router.post("/postProject", authMiddleware, postProjectService);
router.get("/projects", getAllProjectsService);
router.get("/myProjects", authMiddleware, getMyProjectsService);
router.put("/editProject", authMiddleware, editProjectService);
router.delete("/deleteProject", authMiddleware, deleteProjectService);

// router.post('/applyProject', addApplicationService);
// router.put('/editApplication', editApplicationService); // to change the role
// router.delete('/deleteApplication', deleteApplicationService);

// router.get('/projectApplicants', getApplicantsService);
// router.post('/acceptApplicant', acceptApplicantService);
router.post('/shortlistApplicant', shortlistApplicantService);
router.post('/rejectApplicant', rejectApplicantService);

export default router;
