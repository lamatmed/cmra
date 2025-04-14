import { notFound } from "next/navigation";
import { getAllActivities } from "@/utils/actions";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";

// Typage des paramètres
type Params = {
    params: {
        id: string;
    };
};

// Fonction pour générer les paramètres statiques à l'avance
export async function generateStaticParams() {
    const activities = await getAllActivities();
    return activities.map((activity: any) => ({
        id: activity.id,
    }));
}

// Page des détails d'une activité
const ActivityDetailsPage = async ({ params }: Params) => {
    const activities = await getAllActivities(); // Chargement des activités
    const activity = activities.find((a: any) => a.id === params.id); // Recherche de l'activité avec l'ID

    if (!activity) return notFound(); // Si l'activité n'est pas trouvée, afficher la page 404

    // Formatage de la date
    const formattedDate = new Date(activity.date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen px-4 py-10 from-green-600 via-emerald-500 to-lime-400 text-white" dir="rtl">
            <div className="max-w-3xl mx-auto bg-neutral-800 p-6 sm:p-10 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-indigo-400 mb-6 text-center">{activity.title}</h1>

                {activity.imageUrl && (
                    <div className="mb-6 rounded-xl overflow-hidden">
                        <Image
                            src={activity.imageUrl}
                            alt={activity.title}
                            width={1000}
                            height={500}
                            className="rounded-xl object-cover w-full"
                        />
                    </div>
                )}

                <p className="text-lg text-neutral-200 leading-relaxed mb-6">{activity.description}</p>

                <div className="flex items-center gap-2 justify-center text-neutral-400">
                    <FaRegCalendarAlt className="w-5 h-5" />
                    <span>{formattedDate}</span>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetailsPage;
