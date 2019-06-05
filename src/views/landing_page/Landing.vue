<template>
    <q-layout>
        <q-btn @click="resetWs">reset</q-btn>
        <q-page-container>
            Status: {{output}}
            <br/>
            Message: {{message}}
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {
        data() {
            return {
                output: '',
                message: '',
                wsUri: 'ws://echo.websocket.org/',
                websocket: null
            }
        },
        methods: {
            resetWs() {
                let socket = this.websocket;
                if (socket.readyState === WebSocket.OPEN) {
                    socket.close();
                    this.output = 'reconnecting';
                    setTimeout(() => {
                        this.init();
                    }, 1000);
                }
            },
            testWebSocket() {
                this.websocket = new WebSocket(this.wsUri);
                const socket = this.websocket;
                socket.onopen = e => {
                    socket.send('connection established');
                    this.output = 'Connected';
                };
                socket.onmessage = e => {
                    this.message = e.data;
                };

                socket.onclose = e => {
                    socket.send('connection closed');
                    // this.output = e.data;
                }
            },
            init() {
                this.testWebSocket();
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
