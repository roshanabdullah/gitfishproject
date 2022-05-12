import uuid
import string


class Secrets:
    def get_random_keys(self, type):
        """Returns a random key for given type."""

        random_dict = {'password': 11, 'unique_code': 12,
                       'partner_key': 24, 'auth_key': 32, 'franchise_key': 22}

        random = str(uuid.uuid4())
        random = random.replace("-", "")
        random = random.lower()

        return random[0:random_dict[type]]

    def get_tracking_id(self):
        import random
        size = 10
        chars = string.digits

        random = ''.join(random.choice(chars) for _ in range(size))
        random = 'ABN' + '-' + random
        return random

    def get_verification_pin(self):
        import random
        size = 4
        chars = string.digits

        random = ''.join(random.choice(chars) for _ in range(size))
        return random
