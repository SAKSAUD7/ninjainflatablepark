import { Attraction } from "@repo/types";

export const attractions: Attraction[] = [
    {
        id: "ninja-obstacle-course",
        title: "Ninja Obstacle Course",
        description: "Test your agility and strength on our ultimate ninja warrior-style inflatable course. Climb, jump, and conquer!",
        image: "/obstacle-course.jpg",
        category: "obstacle",
        minAge: 7,
        intensity: "high",
    },
    {
        id: "giant-slides",
        title: "Giant Slides",
        description: "Experience the thrill of our massive inflatable slides. Race your friends down multiple lanes!",
        image: "/giant-slides.jpg",
        category: "thrill",
        minAge: 5,
        intensity: "high",
    },
    {
        id: "wipe-out-challenge",
        title: "Wipe-Out Challenge",
        description: "Can you stay balanced? Navigate the spinning obstacles without falling into the soft landing zone!",
        image: "/images/attractions/wipeout.jpg",
        category: "thrill",
        minAge: 8,
        intensity: "high",
    },
    {
        id: "inflatable-maze",
        title: "Inflatable Maze",
        description: "Get lost in our colorful maze! Find your way through twists, turns, and surprise obstacles.",
        image: "/images/attractions/maze.jpg",
        category: "family",
        minAge: 4,
        intensity: "low",
    },
    {
        id: "giant-jumping-balls",
        title: "Giant Jumping Balls",
        description: "Bounce to new heights on our oversized jumping balls. Perfect for all ages!",
        image: "/images/attractions/jumping-balls.jpg",
        category: "kids",
        minAge: 3,
        intensity: "low",
    },
    {
        id: "dinosaur-guard",
        title: "Dinosaur Guard",
        description: "Navigate past the inflatable dinosaurs in this prehistoric adventure zone!",
        image: "/images/attractions/dinosaur.jpg",
        category: "kids",
        minAge: 3,
        intensity: "low",
    },
    {
        id: "balance-beam",
        title: "Balance Beam Challenge",
        description: "Test your balance skills on our inflatable beam. Don't fall off!",
        image: "/images/attractions/balance-beam.jpg",
        category: "obstacle",
        minAge: 6,
        intensity: "medium",
    },
    {
        id: "jelly-bead-zone",
        title: "Jelly Bead Zone",
        description: "Dive into thousands of soft, colorful jelly beads. A sensory experience like no other!",
        image: "/images/attractions/jelly-beads.jpg",
        category: "kids",
        minAge: 2,
        intensity: "low",
    },
    {
        id: "climbing-wall",
        title: "Inflatable Climbing Wall",
        description: "Scale the heights on our safe, inflatable climbing wall. Reach the summit!",
        image: "/images/attractions/climbing-wall.jpg",
        category: "obstacle",
        minAge: 7,
        intensity: "medium",
    },
    {
        id: "spider-wall",
        title: "Spider Wall",
        description: "Stick to the wall like a spider! Jump and see how high you can climb.",
        image: "/images/attractions/spider-wall.jpg",
        category: "thrill",
        minAge: 8,
        intensity: "medium",
    },
    {
        id: "wave-bed",
        title: "Wave Bed",
        description: "Ride the waves on our bouncy inflatable bed. Perfect for group fun!",
        image: "/images/attractions/wave-bed.jpg",
        category: "family",
        minAge: 5,
        intensity: "medium",
    },
];

export const getAttractionsByCategory = (category: Attraction["category"]) => {
    return attractions.filter((a) => a.category === category);
};

export const getAttractionById = (id: string) => {
    return attractions.find((a) => a.id === id);
};
