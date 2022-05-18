# run
npm start

# build
# change "version" or "buildNumber" in app.json
npx expo build:ios

npx expo build:android


## ToFix "digital envelope routines::unsupported" error on build, run this first
export NODE_OPTIONS=--openssl-legacy-provider