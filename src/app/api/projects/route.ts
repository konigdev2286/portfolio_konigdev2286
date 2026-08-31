import { NextResponse } from "next/server";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/projects";

// ---------------------------------------------------------------
// GET /api/projects — liste tous les projets
// ---------------------------------------------------------------
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("GET /api/projects:", error);
    return NextResponse.json(
      { success: false, message: String(error) },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------
// POST /api/projects — crée un nouveau projet
// ---------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, description, techStack, githubUrl, liveUrl, imageUrl, featured, status } = body;

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        { success: false, message: "Le titre et la description sont obligatoires" },
        { status: 400 }
      );
    }

    const project = await createProject({
      title,
      category: category || "Développement",
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      githubUrl: githubUrl || "",
      liveUrl:   liveUrl   || "",
      imageUrl:  imageUrl  || "",
      featured:  Boolean(featured),
      status:    status    || "En cours",
    });

    return NextResponse.json({
      success: true,
      message: "Projet ajouté avec succès",
      project,
    });
  } catch (error) {
    console.error("POST /api/projects:", error);
    return NextResponse.json(
      { success: false, message: String(error) },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------
// PUT /api/projects — modifie un projet existant
// ---------------------------------------------------------------
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID du projet manquant" },
        { status: 400 }
      );
    }

    const project = await updateProject(id, {
      title:       fields.title,
      category:    fields.category,
      description: fields.description,
      techStack:   Array.isArray(fields.techStack) ? fields.techStack : undefined,
      githubUrl:   fields.githubUrl,
      liveUrl:     fields.liveUrl,
      imageUrl:    fields.imageUrl,
      featured:    fields.featured !== undefined ? Boolean(fields.featured) : undefined,
      status:      fields.status,
    });

    return NextResponse.json({
      success: true,
      message: "Projet mis à jour avec succès",
      project,
    });
  } catch (error) {
    console.error("PUT /api/projects:", error);
    const status = String(error).includes("introuvable") ? 404 : 500;
    return NextResponse.json(
      { success: false, message: String(error) },
      { status }
    );
  }
}

// ---------------------------------------------------------------
// DELETE /api/projects?id=xxx — supprime un projet
// ---------------------------------------------------------------
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID manquant pour la suppression" },
        { status: 400 }
      );
    }

    await deleteProject(id);

    return NextResponse.json({
      success: true,
      message: "Projet supprimé avec succès",
    });
  } catch (error) {
    console.error("DELETE /api/projects:", error);
    const status = String(error).includes("introuvable") ? 404 : 500;
    return NextResponse.json(
      { success: false, message: String(error) },
      { status }
    );
  }
}
