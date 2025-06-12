// components/ChatPdfDocument.tsx
import { ChatItem } from "@/types/chatType";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, lineHeight: 1.5 },
    messageBlock: { marginBottom: 8, padding: 10, borderRadius: 12 },
    sender: { fontWeight: "bold", marginBottom: 2 },
    senderMe: { color: "#34AD5D" },
    time: { fontSize: 10, color: "#666" },
    message: { whiteSpace: "pre-wrap" },
});

export default function ChatPdfTemplate({ chat }: { chat: ChatItem[] }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {chat.map((item, i) => (
                    <View key={i} style={styles.messageBlock}>
                        <Text style={[item.isMe ? styles.senderMe : styles.sender, styles.sender]}>
                            {item.sender} <Text style={styles.time}>({item.timestamp})</Text>
                        </Text>
                        <Text style={styles.message}>{item.message}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
}
