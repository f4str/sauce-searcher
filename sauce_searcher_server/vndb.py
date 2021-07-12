import json
import socket

from sauce_searcher_server.constants import (
    VNDB_BUFFER_SIZE,
    VNDB_DELIMITER,
    VNDB_HOSTNAME,
    VNDB_PORT,
)


class VNDBSession:
    def __init__(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((VNDB_HOSTNAME, VNDB_PORT))

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.sock.shutdown(socket.SHUT_RDWR)
        self.sock.close()

    def send(self, message: bytes):
        totalsent = 0
        while totalsent < len(message):
            sent = self.sock.send(message[totalsent:])
            if sent == 0:
                raise RuntimeError('Socket connection broken')
            totalsent += sent

    def receive(self) -> bytes:
        chunks = [b'']
        while not chunks[-1].endswith(VNDB_DELIMITER.encode()):
            chunk = self.sock.recv(VNDB_BUFFER_SIZE)
            if chunk == b'':
                raise RuntimeError('Socket connection broken')
            chunks.append(chunk)
        return b''.join(chunks).rstrip(VNDB_DELIMITER.encode())

    def query(self, command: str) -> str:
        self.send(command.encode())
        response = self.receive().decode()
        return response

    def login(self) -> str:
        config = {'protocol': 1, 'client': 'test', 'clientver': 0.1}
        command = f'login {json.dumps(config).replace(" ", "")}{VNDB_DELIMITER}'
        return self.query(command)

    def get(self, type: str, flags: str, filters: str, options: str = '') -> dict:
        command = f'get {type} {flags} {filters} {options}{VNDB_DELIMITER}'
        buffer = self.query(command)
        response = json.loads(' '.join(buffer.split(' ')[1:]))
        return response

    def set(self, type: str, ids: str, fields: str) -> str:
        command = f'set {type} {ids} {fields}{VNDB_DELIMITER}'
        return self.query(command)
