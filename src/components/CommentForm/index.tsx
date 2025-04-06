import { Button } from "@/components/ui/button";

export default function CommandForm() {
  return (
    <form className="flex flex-col space-y-4">
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">化名</span>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          placeholder="佚名"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-lg font-semibold mb-2">回聲</span>
        <textarea
          className="border border-gray-300 rounded-md p-2"
          rows={4}
          placeholder="在這裏留下你的回聲..."
          maxLength={65535}
        />
      </label>
      <Button type="submit" className="w-full mt-4">發送</Button>
    </form>
  )
}