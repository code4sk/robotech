class ObjectUpdateMixin:
    a = 2

    def get(self):
        print(self.a)


class B:
    a = 9


class D:
    def __init__(self):
        super().__init__()
        print('fourth')


class C(ObjectUpdateMixin, B):
    a = 5

    def call(self):
        ObjectUpdateMixin.get(self)


obj = C()
print(C.mro())
