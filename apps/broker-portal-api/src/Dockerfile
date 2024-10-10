FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine3.20 AS build

WORKDIR /app

COPY ./BrokerPortalApi.csproj ./

# the main app
RUN dotnet restore ./BrokerPortalApi.csproj \
  -r linux-musl-x64 

COPY . ./

RUN dotnet build ./BrokerPortalApi.csproj \
  -r linux-musl-x64 \
  -c Release \
  --no-restore \
  --self-contained 

FROM build AS publish

RUN dotnet publish ./BrokerPortalApi.csproj \
  -r linux-musl-x64 \
  -c Release \
  --no-restore \
  --no-build \
  --self-contained \
  --output publish

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0-alpine3.20 AS final

WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS="http://*:7000"
EXPOSE 7000


ENTRYPOINT ["./BrokerPortalApi"]