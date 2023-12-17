import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../storage";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RoomTelemetry() {
  const { roomId } = useParams();
  const { user } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  console.log(messages)

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource(
        `/app/room/devices/telemetry?userId=${user.id.id}&roomId=${roomId}`
      );

      eventSource.onmessage = (event) => {
        setMessages(JSON.parse(event.data));
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        eventSource.close();
      };

      // Clean up the event source on component unmount
      return () => {
        eventSource.close();
      };
    }
  }, [user]);

  return (
    <div style={{ height: "fit-content" }}>
      {messages?.map((object) => {
          const key = Object.keys(object)[0];
          const data = object[key];
          const reversedData = data?.slice().reverse();
          
          return (key && <div>
            <h3>{key?.[0].toUpperCase() + key?.slice(1)}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={reversedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          </div>);
        })}
    </div>
  );
}
