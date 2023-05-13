<script lang="ts">
    let score: number | "?" = "?";

    function getColor(score: number | "?"): string {
        if (score === "?") {
            return "bg-gray-500";
        } else if (score >= 70) {
            return "bg-green-500";
        } else if (score >= 30) {
            return "bg-yellow-300";
        } else {
            return "bg-red-500";
        }
    }

    let color = getColor(score);

    setInterval(() => {
        score = Math.floor(Math.random() * 100);
        color = getColor(score);
    }, 1000);
</script>

<div
    id="score-circle"
    class="lg:w-48 lg:h-48 h-32 w-32 rounded-full flex items-center justify-center relative {color} text-shadow"
>
    <span id="score" class="text-3xl md:text-5xl font-bold text-white z-10"
        >{score}</span
    >
    <div
        class="percentage absolute text-xl md:text-xl -mb-11 md:-mb-16 right-2.5 md:right-4"
    >
        /100
    </div>
</div>
