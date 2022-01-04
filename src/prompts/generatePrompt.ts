import type { PromptObject } from 'prompts';
import { JavaScriptGenerateTemplates, TypeScriptGenerateTemplates } from '../utils/templates';
import fs from 'fs';

export const generatePrompt = (config): Array<PromptObject> => {
    return [
        {
            type: 'text',
            name: 'component-name',
            message: 'What\'s the name of your component?',
            validate: (value) => {
                const regexp = /^[a-z0-9]+$/i.test(value);

                if (!regexp) return `Only \`/^[a-z0-9]+$/i\` characters are allowed`;

                return true;
            }
        },
        {
            type: 'select',
            name: 'component-template',
            message: 'Select a type for your component',
            choices: () => config['project-language'] === 'js' ? JavaScriptGenerateTemplates : TypeScriptGenerateTemplates
        },
        ...commandSelect,
        ...listenerSelect
    ]
}

export const commandSelect = [
    {
        type: (prev) => prev.type === 'command' ? 'text' : null,
        name: 'command-description',
        message: 'What\'s the description of your command?',
    },
    {
        type: (prev) => {
            if (prev.type && prev.type !== 'command') return null;
            if (typeof prev !== 'undefined' && typeof prev === 'string') return 'multiselect';
            else return null; 
        },
        name: 'command-types',
        message: 'Select a types for your command',
        choices: [
            { title: 'Slash Command', value: 'CommandType.SLASH' },
            { title: 'Message Command', value: 'CommandType.MESSAGE' },
            { title: 'Context User Command', value: 'CommandType.CONTEXT_USER' },
            { title: 'Context Message Command', value: 'CommandType.CONTEXT_MESSAGE' },
        ]
    }
]

export const listenerSelect = [
    {
        type: (prev) => prev.type === 'listener' ? 'select' : null,
        name: 'listener-event',
        message: 'Select a listener',
        choices: [
            {
                title: 'rateLimit',
                value: { parameters: [ 'ctx' ], name: 'rateLimit' }
              },
              {
                title: 'invalidRequestWarning',
                value: { parameters: [ 'ctx' ], name: 'invalidRequestWarning' }
              },
              {
                title: 'apiResponse',
                value: { parameters: [ 'request', 'response' ], name: 'apiResponse' }
              },
              {
                title: 'apiRequest',
                value: { parameters: [ 'request' ], name: 'apiRequest' }
              },
              { title: 'ready', value: { parameters: [ 'client' ], name: 'ready' } } ,
              {
                title: 'applicationCommandCreate',
                value: { parameters: [ 'command' ], name: 'applicationCommandCreate' }
              },
              {
                title: 'applicationCommandDelete',
                value: { parameters: [ 'command' ], name: 'applicationCommandDelete' }
              },
              {
                title: 'applicationCommandUpdate',
                value: {
                  parameters: [ 'oldCommand', 'newCommand' ],
                  name: 'applicationCommandUpdate'
                }
              },
              {
                title: 'guildCreate',
                value: { parameters: [ 'guild' ], name: 'guildCreate' }
              },
              {
                title: 'guildDelete',
                value: { parameters: [ 'guild' ], name: 'guildDelete' }
              },
              {
                title: 'guildUpdate',
                value: { parameters: [ 'oldGuild', 'newGuild' ], name: 'guildUpdate' }
              },
              {
                title: 'guildUnavailable',
                value: { parameters: [ 'guild' ], name: 'guildUnavailable' }
              },
              {
                title: 'guildMemberAdd',
                value: { parameters: [ 'member' ], name: 'guildMemberAdd' }
              },
              {
                title: 'guildMemberRemove',
                value: { parameters: [ 'member' ], name: 'guildMemberRemove' }
              },
              {
                title: 'guildMemberUpdate',
                value: {
                  parameters: [ 'oldMember', 'newMember' ],
                  name: 'guildMemberUpdate'
                }
              },
              {
                title: 'guildMemberAvailable',
                value: { parameters: [ 'members' ], name: 'guildMemberAvailable' }
              },
              {
                title: 'guildMembersChunk',
                value: {
                  parameters: [ 'members', 'guild', 'chunk' ],
                  name: 'guildMembersChunk'
                }
              },
              {
                title: 'guildIntegrationsUpdate',
                value: { parameters: [ 'guild' ], name: 'guildIntegrationsUpdate' }
              },
              {
                title: 'roleCreate',
                value: { parameters: [ 'role' ], name: 'roleCreate' }
              },
              {
                title: 'roleDelete',
                value: { parameters: [ 'role' ], name: 'roleDelete' }
              },
              {
                title: 'inviteCreate',
                value: { parameters: [ 'invite' ], name: 'inviteCreate' }
              },
              {
                title: 'inviteDelete',
                value: { parameters: [ 'invite' ], name: 'inviteDelete' }
              },
              {
                title: 'roleUpdate',
                value: { parameters: [ 'oldRole', 'newRole' ], name: 'roleUpdate' }
              },
              {
                title: 'emojiCreate',
                value: { parameters: [ 'emoji' ], name: 'emojiCreate' }
              },
              {
                title: 'emojiDelete',
                value: { parameters: [ 'emoji' ], name: 'emojiDelete' }
              },
              {
                title: 'emojiUpdate',
                value: { parameters: [ 'oldEmoji', 'newEmoji' ], name: 'emojiUpdate' }
              },
              {
                title: 'guildBanAdd',
                value: { parameters: [ 'ban' ], name: 'guildBanAdd' }
              },
              {
                title: 'guildBanRemove',
                value: { parameters: [ 'ban' ], name: 'guildBanRemove' }
              },
              {
                title: 'channelCreate',
                value: { parameters: [ 'channel' ], name: 'channelCreate' }
              },
              {
                title: 'channelDelete',
                value: { parameters: [ 'channel' ], name: 'channelDelete' }
              },
              {
                title: 'channelUpdate',
                value: { parameters: [ 'oldChannel', 'newChannel' ], name: 'channelUpdate' }
              },
              {
                title: 'channelPinsUpdate',
                value: { parameters: [ 'channel', 'time' ], name: 'channelPinsUpdate' }
              },
              {
                title: 'messageCreate',
                value: { parameters: [ 'message' ], name: 'messageCreate' }
              },
              {
                title: 'messageDelete',
                value: { parameters: [ 'message' ], name: 'messageDelete' }
              },
              {
                title: 'messageUpdate',
                value: { parameters: [ 'oldMessage', 'newMessage' ], name: 'messageUpdate' }
              } ,
              {
                title: 'messageDeleteBulk',
                value: { parameters: [ 'messages' ], name: 'messageDeleteBulk' }
              },
              {
                title: 'messageReactionAdd',
                value: { parameters: [ 'reaction', 'user' ], name: 'messageReactionAdd' }
              },
              {
                title: 'messageReactionRemove',
                value: {
                  parameters: [ 'message', 'reactions' ],
                  name: 'messageReactionRemove'
                }
              },
              {
                title: 'messageReactionRemoveAll',
                value: {
                  parameters: [ 'message', 'reactions' ],
                  name: 'messageReactionRemoveAll'
                }
              },
              {
                title: 'messageReactionRemoveEmoji',
                value: { parameters: [ 'reaction' ], name: 'messageReactionRemoveEmoji' }
              },
              {
                title: 'threadCreate',
                value: { parameters: [ 'thread' ], name: 'threadCreate' }
              },
              {
                title: 'threadDelete',
                value: { parameters: [ 'thread' ], name: 'threadDelete' }
              },
              {
                title: 'threadUpdate',
                value: { parameters: [ 'oldThread', 'newThread' ], name: 'threadUpdate' }
              },
              {
                title: 'threadListSync',
                value: { parameters: [ 'threads' ], name: 'threadListSync' }
              },
              {
                title: 'threadMemberUpdate',
                value: {
                  parameters: [ 'oldMember', 'newMember' ],
                  name: 'threadMemberUpdate'
                }
              },
              {
                title: 'threadMembersUpdate',
                value: {
                  parameters: [ 'oldMembers', 'newMembers' ],
                  name: 'threadMembersUpdate'
                }
              },
              {
                title: 'userUpdate',
                value: { parameters: [ 'oldUser', 'newUser' ], name: 'userUpdate' }
              },
              {
                title: 'presenceUpdate',
                value: {
                  parameters: [ 'oldPresence', 'newPresence' ],
                  name: 'presenceUpdate'
                }
              },
              {
                title: 'voiceStateUpdate',
                value: { parameters: [ 'oldState', 'newState' ], name: 'voiceStateUpdate' }
              },
              {
                title: 'typingStart',
                value: { parameters: [ 'typing' ], name: 'typingStart' }
              },
              {
                title: 'webhookUpdate',
                value: { parameters: [ 'channel' ], name: 'webhookUpdate' }
              },
              {
                title: 'interactionCreate',
                value: { parameters: [ 'interaction' ], name: 'interactionCreate' }
              },
              { title: 'error', value: { parameters: [ 'error' ], name: 'error' } },
              { title: 'warn', value: { parameters: [ 'warn' ], name: 'warn' } },
              { title: 'debug', value: { parameters: [ 'debug' ], name: 'debug' } },
              {
                title: 'shardDisconnect',
                value: { parameters: [ 'event', 'id' ], name: 'shardDisconnect' }
              },
              {
                title: 'shardError',
                value: { parameters: [ 'error', 'id' ], name: 'shardError' }
              },
              {
                title: 'shardReconnecting',
                value: { parameters: [ 'id' ], name: 'shardReconnecting' }
              },
              {
                title: 'shardReady',
                value: { parameters: [ 'id', 'unavailableGuilds' ], name: 'shardReady' }
              },
              {
                title: 'shardResume',
                value: { parameters: [ 'id', 'replayedEvents' ], name: 'shardResume' }
              },
              {
                title: 'invalidated',
                value: { parameters: [], name: 'invalidated' }
              },
              {
                title: 'stageInstanceCreate',
                value: { parameters: [ 'stageInstance' ], name: 'stageInstanceCreate' }
              },
              {
                title: 'stageInstanceUpdate',
                value: {
                  parameters: [ 'oldStageInstance', 'newStageInstance' ],
                  name: 'stageInstanceUpdate'
                }
              },
              {
                title: 'stageInstanceDelete',
                value: { parameters: [ 'stageInstance' ], name: 'stageInstanceDelete' }
              },
              {
                title: 'stickerCreate',
                value: { parameters: [ 'sticker' ], name: 'stickerCreate' }
              },
              {
                title: 'stickerDelete',
                value: { parameters: [ 'sticker' ], name: 'stickerDelete' }
              },
              {
                title: 'stickerUpdate',
                value: { parameters: [ 'oldSticker', 'newSticker' ], name: 'stickerUpdate' }
              },
              {
                title: 'guildScheduledEventCreate',
                value: {
                  parameters: [ 'guildScheduledEvent' ],
                  name: 'guildScheduledEventCreate'
                }
              },
              {
                title: 'guildScheduledEventUpdate',
                value: {
                  parameters: [ 'oldGuildScheduledEvent', 'newGuildScheduledEvent' ],
                  name: 'guildScheduledEventUpdate'
                }
              },
              {
                title: 'guildScheduledEventDelete',
                value: {
                  parameters: [ 'guildScheduledEvent' ],
                  name: 'guildScheduledEventDelete'
                }
              },
              {
                title: 'guildScheduledEventUserAdd',
                value: {
                  parameters: [ 'guildScheduledEvent', 'user' ],
                  name: 'guildScheduledEventUserAdd'
                }
              },
              {
                title: 'guildScheduledEventUserRemove',
                value: {
                  parameters: [ 'guildScheduledEvent', 'user' ],
                  name: 'guildScheduledEventUserRemove'
                }
              }
        ]
    }
]