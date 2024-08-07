import { useRouter } from "next/router";
export default function MM() {
    const router = useRouter();
    router.push('./dashboard');
}