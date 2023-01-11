import logging
import os
import sys
import json


# append py_modules to PYTHONPATH
sys.path.append(os.path.dirname(os.path.realpath(__file__))+"/py_modules")


logging.basicConfig(filename="/tmp/template.log",
                    format='[Template] %(asctime)s %(levelname)s %(message)s',
                    filemode='w+',
                    force=True)
logger = logging.getLogger()
# can be changed to logging.DEBUG for debugging issues
logger.setLevel(logging.INFO)


class File:
    def __init__(self, path):
        self.path = path
        self.filename = os.path.basename(path)
        self.is_dir = not os.path.isfile(self.path)

    def list(self):
        names = os.listdir(self.path)
        files = []
        for name in names:
            files.append(File(os.path.join(self.path, name)))
        return sorted(files, key=lambda a, b: a.filename < b.filename)


class Plugin:
    # A normal method. It can be called from JavaScript using call_plugin_function("method_1", argument1, argument2)
    async def add(self, left, right):
        return left + right

    async def list_files(self, path):
        base = File(path)
        files = base.list()
        return json.dumps(files, default=vars)

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        logger.info("Hello World!")

    # Function called first during the unload process, utilize this to handle your plugin being removed
    async def _unload(self):
        logger.info("Goodbye World!")
        pass
