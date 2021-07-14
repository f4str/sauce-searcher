from pathlib import Path

from setuptools import find_packages, setup

readme_file = Path(__file__).parent / 'README.md'
if readme_file.exists():
    with readme_file.open() as f:
        long_description = f.read()
else:
    long_description = ''

setup(
    name='sauce-searcher-server',
    version='1.0.0',
    description='Sauce Searcher Server',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/f4str/sauce-searcher-server',
    license='MIT',
    author='Farhan Ahmed',
    keywords='',
    classifiers=[
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python',
    ],
    python_requires='>=3.6',
    packages=find_packages(),
    include_package_data=True,
    install_requires=['fastapi', 'uvicorn[standard]', 'requests'],
    extras_require={'dev': ['pytest', 'tox']},
)
