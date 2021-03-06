# Uprooted: Meal Replacement Game
## wut
A turn-based farming RPG.
## disclaimer
There is some strong language in the game's text, as well as in some of the source code because I am 12 years old and think seeing a rabbit say bad words is funny.
## license
This game's source code is licensed with the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html). All art assets are licensed with the [CC BY-SA 4.0 License](https://creativecommons.org/licenses/by-sa/4.0/legalcode).
## why
Sometimes I make choices. They aren't always good ones.
## building
### requirements
[Uglify-ES](https://www.npmjs.com/package/uglify-es) is used to compile all the necessary JS files into one big baby (and also minify them). [Gulp](https://www.npmjs.com/package/gulp) is used to automate this building and to rebuild the **collisions.js** file, and also requires [gulp-foreach](https://www.npmjs.com/package/gulp-foreach) (which is deprecated lol #oops) and [get-pixels](https://www.npmjs.com/package/get-pixels). All of the raw art assets are stored in [Paint.NET](https://www.getpaint.net/)'s format. PowerShell is used to convert several of the **.ods** files into the appropriate **.js** files; these scripts also use [LibreOffice](https://www.libreoffice.org/) to convert the **.ods** files into **.csv** files that PowerShell can work with. [jQuery](https://jquery.com/) is used to build the guide, and [Bootstrap](https://getbootstrap.com/) is used to style it.

If you don't want to or cannot install UglifyJS, you can just manually include all the necessary JS files in **index.html** or merge them all into a single file with some other tool.

If you don't want to or cannot install Gulp, you can probably build the collisions file some other way - it basically just reads the images in the **collision** directory and makes arrays out of them - ``true`` for red pixels, ``false`` for transparent pixels.

If you don't want to or cannot install Paint.NET, you can edit the image files in any old image editor. They're images.

If you don't want to or cannot install LibreOffice, you can save the **.ods** files as **.csv** files manually.

If you don't want to or cannot install PowerShell, you can just edit the various **.js** files manually.

### images
For pretty much every file in the **pdn** directory, just copy the main layer(s) into a new file, scale by 400% (using _nearest neighbor_ scaling) and then save as a PNG with the same name in the **img** directory (a few files have different names in the **img** directory than their **pdn** counterparts). For map files, copy the red/transparent layer into a new file, scale it to 1/16 its original size, then save that as a PNG with the same name in the **collision** directory.
### worldmap/collisions.js
Run ``gulp buildcollisions`` any time a file in the **collision** directory is added/changed/removed. Currently the output file needs to have the last comma and the closing ``};`` manually removed and added respectively.
### .ods files
You may need to update the path to LibreOffice's ``soffice.exe`` in these scripts.

Run ``BuildTextNew.ps1`` to build ``gamedata/text.js`` and ``gamedata/cutscenes.js`` from ``Details_Text.ods`` and ``Details_Cutscenes.ods`` respectively.

Run ``BuildItemDetails.ps1`` to build ``gamedata\veggies.js``, ``gamedata\equipment.js``, ``gamedata\fixtures.js``, and ``gamedata\enemies.js`` from ``Details_Crops.ods``, ``Details_Equipment.ods``, ``Details_Fixtures.ods``, and ``Details_Enemies.ods`` respectively.

Run ``BuildEnemyAttackJSON.ps1`` to merge all **.json** files in ``extbuild\enemyjson\`` into ``gamedata\enemy_patterns.js``. The **.json** files are created with a modified version of [Kelly](https://github.com/HauntedBees/Kevin) which will be checked in eventually.
### main game
Run ``uglify.cmd`` or just call the **uglifyjs** command in the file.

### Android Build
Navigate to the root directory, then run:
```
cd cordova
cordova build android --release
cd platforms/android/app/build/outputs/apk/release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore [yourKeyStore] app-release-unsigned.apk [yourKey]
zipalign -v 4 app-release-unsigned.apk Uprooted.apk
```

### Electron Build
**Dev Build:** `npm start`
**Package Only:** `npm pack`
**Package for Distribution:** `npm run dist`

## want to make changes?
The game isn't even done yet hold your horses yo.
## additional assets
Pretty much all sound effects are taken from [512 Sound Effects (8-Bit Style)](https://opengameart.org/content/512-sound-effects-8-bit-style) by [Juhani Junkala](https://juhanijunkala.com/) and are licensed under the [CC 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).