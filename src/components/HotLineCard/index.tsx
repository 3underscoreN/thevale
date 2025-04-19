import { Card, CardContent } from "@/components/ui/card";

import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";


export default function HotLineCard() {
  return (
    <Card className="w-full md:w-3/4">
      <CardContent>
        <h2 className="text-xl font-bold my-2">香港</h2>
        <ul className="space-y-2 text-lg list-content-align">
          <li>
            <Button variant="link" asChild>
              <a href="https://www.samaritans.org.hk/" target="_blank" rel="noreferrer">
                <span className="text-lg">香港撒瑪利亞會</span>
              </a>
            </Button>
            <div className="ps-8 text-sm overflow-clip">2896 0000<Badge className="ms-2" variant="outline">24/7</Badge></div>
          </li>
          <li>
            <Button variant="link" asChild>
              <a href="https://www.shallwetalk.hk/zh/get-help/mental-health-support-hotline-18111/" target="_blank" rel="noreferrer">
                <span className="text-lg">「情緒通」精神健康支援熱線</span>
              </a>
            </Button>
            <div className="ps-8 text-sm overflow-clip">18111<Badge className="ms-2" variant="outline">24/7</Badge></div>
          </li>
          <li>
            <Button variant="link" asChild>
              <a href="https://www.openup.hk/" target="_blank" rel="noreferrer">
                <span className="text-lg">Open噏 網上聊天室</span>
              </a>
            </Button>
            <FontAwesomeIcon icon={faExternalLink} className="text-sm" />
            <Badge className="ms-2" variant="outline">24/7</Badge>
          </li>
        </ul>
        <h2 className="text-xl font-bold my-2">台灣</h2>
        <ul className="space-y-2 text-lg">
          <li>
            <Button variant="link" asChild>
              <a href="https://dep.mohw.gov.tw/DOMHAOH/cp-4906-54077-107.html" target="_blank" rel="noreferrer">
                <span className="text-lg">衛生福利部</span>
              </a>
            </Button>
            <div className="ps-8 text-sm overflow-clip">1925<Badge className="ms-2" variant="outline">24/7</Badge></div>
          </li>
          <li>
            <Button variant="link" asChild>
              <a href="https://www.1980.org.tw/service_item_show.php?service_item_id=1" target="_blank" rel="noreferrer">
                <span className="text-lg">張老師 網路輔導</span>
              </a>
            </Button>
            <FontAwesomeIcon icon={faExternalLink} className="text-sm me-2" />
            <div className=" ps-8 text-sm"> (星期一至星期六晚上18:30-21:30)</div>
          </li>
        </ul>
        <h2 className="text-xl font-bold my-2">澳門</h2>
        <ul className="space-y-2 text-lg">
          <li>
            <Button variant="link" asChild>
              <a href="https://www.ias.gov.mo/zh" target="_blank" rel="noreferrer">
                <span className="text-lg">社工局</span>
              </a>
            </Button>
            <div className="ps-8 text-sm overflow-clip">2826 1126<Badge className="ms-2" variant="outline">24/7</Badge></div>
          </li>
          <li>
            <Button variant="link" asChild>
              <a href="https://www.caritas.org.mo/youth-and-community-service/213" target="_blank" rel="noreferrer">
                <span className="text-lg">澳門明愛生命熱線</span>
              </a>
            </Button>
            <div className="ps-8 text-sm overflow-clip">2852 5222<Badge className="ms-2" variant="outline">24/7</Badge></div>
          </li>
        </ul>
        <h2 className="text-xl font-bold my-2">其他地區</h2>
        <ul className="space-y-2 text-lg">
          <li>
            <Button variant="link" asChild>
              <a href="https://findahelpline.com/" target="_blank" rel="noreferrer">
                <span className="text-lg">find a helpline</span>
              </a>
            </Button>
            <div className="ps-8 text-sm overflow-clip">尋找你所在地區的熱線</div>
          </li>
        </ul>
        <div className="flex justify-end mt-2">
          <h6 className="inline-block text-md text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-orange-300">
            因為你很重要。
          </h6>
        </div>
      </CardContent>
    </Card>
  )
}